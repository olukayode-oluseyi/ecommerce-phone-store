import React, { Component, useState, useEffect } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { remove } from "store";
import firebase from './../firebase';

export const ProductContext = React.createContext();

export const ProductProvider = (props) => {
  const [storeProducts, setStoreProducts] = useState([]);
 const { promiseInProgress } = usePromiseTracker();
  const [cart, setCart] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState();

  const [subTotal, setSubTotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)
  const [user, setUser] = useState(null);
 

  useEffect(() => {
    setProducts();
    addingToLocalStorage();
    handleCalculationsInCart()
    
  }, [cart]);



  const setProducts = () => {
    const productsRef = firebase.database().ref("store-products")
    productsRef.on('value', (snapshot) => {
      const databaseProducts = snapshot.val()
      
      let newArray = []
      for (let databaseProduct in databaseProducts) {
        newArray.push({
          id: databaseProduct,
          title: databaseProducts[databaseProduct].title,
          company: databaseProducts[databaseProduct].company,
          info: databaseProducts[databaseProduct].info,
          img: databaseProducts[databaseProduct].img,
          price: parseFloat(databaseProducts[databaseProduct].price),
          inCart: databaseProducts[databaseProduct].incart,
          count: databaseProducts[databaseProduct].count,
          total: databaseProducts[databaseProduct].total
        })
      }
      newArray.map((product) => {
        cart.map((item) => {
          if (item.id === product.id) {
            product.inCart = true
            return product
          }
        })
      })
      setStoreProducts(newArray)
     
    })


  
  };

  const openModal = (id) => {
    setModalId(id);
    setModal(true);
  };

  const closeModal = (id) => {
    setModal(false);
  };

 
  const addToCart = (id) => {
    storeProducts.filter((storeProduct) => {
      if (storeProduct.id === id) {
        storeProduct.inCart = true;
        storeProduct.total = storeProduct.price;
        storeProduct.count = 1;
        setCart([...cart, storeProduct]);
      }
    });
  };

  const addingToLocalStorage = () => {
    if (cart.length == 0) {
    
      if (localStorage.hasOwnProperty("cart")) {
      
        const newcart = JSON.parse(localStorage.getItem("cart"));
        setCart(newcart);
      } else {
      
      }
    } else {
   
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const handleDeleteInCart = (id) => {
    const newCart = cart.filter((cartItem) => {
    
      if (id !== cartItem.id) {
      
        return cartItem;
      }
    });
  
    setCart(newCart);
    if (newCart.length === 0) {
    
      localStorage.clear();
    }
   storeProducts .map((item) => {
      cart.forEach((element) => {
        if (item.id === element.id) {
          item.inCart = false;
         
        }
      });
     
    });
  };
  const handleCalculationsInCart = () => {
       let subtotal = 0;
    cart.map((item) => {        
      subtotal+=item.total
    })
    setSubTotal(subtotal)
    let tempTax1 = 0.2 * subtotal
    let tempTax2= Math.floor(tempTax1)
    setTax(tempTax2)
    let total = tempTax2 + subtotal
    setTotal(total)
  }
  const increaseCount = (id) => { 
    let tempCart = [...cart]
    const selectedProduct = tempCart.find(item=>item.id === id)
    const index = tempCart.indexOf(selectedProduct)
    const product = tempCart[index]

    product.count = product.count + 1
    product.total = product.count * product.price
    setCart(tempCart)
  }
  const decreaseCount = (id) => {
        let tempCart = [...cart];
        const selectedProduct = tempCart.find((item) => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
    if (product.count == 1) {
  const newCart = cart.filter((cartItem) => {
  
    if (id !== cartItem.id) {
    
      return cartItem;
    }
  });

  setCart(newCart);
  if (newCart.length === 0) {

    localStorage.clear();
  }
  storeProducts.map((item) => {
    cart.forEach((element) => {
      if (item.id === element.id) {
        item.inCart = false;
      }
    });
  });
    } else {
              product.count = product.count - 1;
              product.total = product.count * product.price;
              setCart(tempCart);
}

  };
  const clearCart = () => {
    setCart([])
       storeProducts.map((item) => {
         cart.forEach((element) => {
           if (item.id === element.id) {
             item.inCart = false;
             item.count = 0

           }
         });
       });
  
      localStorage.clear();
    
    
  }
  return (
    <ProductContext.Provider
      value={{
        products: [storeProducts, setStoreProducts],     
        addToCart: addToCart,
        cart: cart,
        openModal: openModal,
        closeModal: closeModal,
        modal: modal,
        modalId: modalId,
        handleDeleteInCart: handleDeleteInCart,
        subTotal: subTotal,
        tax: tax,
        total: total,
        decreaseCount: decreaseCount,
        increaseCount: increaseCount,
        clearCart: clearCart,
        user: user,
        setUser: setUser
       
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};


