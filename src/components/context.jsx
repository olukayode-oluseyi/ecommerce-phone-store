import React, { Component, useState, useEffect } from "react";
import { StoreProducts, DetailProduct } from "./../data";
import { remove } from "store";

export const ProductContext = React.createContext();

export const ProductProvider = (props) => {
  const [storeProducts, setStoreProducts] = useState([]);
  const [detailProduct, setDetailProduct] = useState(DetailProduct);
  const [cart, setCart] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState();
  //const [itemTotal, setItemTotal] = useState()
  const [subTotal, setSubTotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)
 

  useEffect(() => {
    setProducts();
    addingToLocalStorage();
    handleCalculationsInCart()
    
  }, [cart]);

  const setProducts = () => {
    let temp = StoreProducts.map((item) => {
      cart.forEach((element) => {
        if (item.id === element.id) {
        
          item.inCart = true;
        }
      });
      return item;
    });
    setStoreProducts(temp);
  };

  const openModal = (id) => {
    setModalId(id);
    setModal(true);
  };

  const closeModal = (id) => {
    setModal(false);
  };

  // const handleDetail = (id) => {
  //     setDetailProductPage(id)
  // }

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
      console.log("first if");
      if (localStorage.hasOwnProperty("cart")) {
        console.log("second if");
        const newcart = JSON.parse(localStorage.getItem("cart"));
        setCart(newcart);
      } else {
        console.log("first else");
      }
    } else {
      console.log("second else");
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const handleDeleteInCart = (id) => {
    const newCart = cart.filter((cartItem) => {
      console.log(id, cartItem.id);
      if (id !== cartItem.id) {
        console.log("it is", cartItem);
        return cartItem;
      }
    });
    console.log("newcart", newCart);
    setCart(newCart);
    if (newCart.length === 0) {
      console.log("it is 0");
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
    console.log(id, cartItem.id);
    if (id !== cartItem.id) {
      console.log("it is", cartItem);
      return cartItem;
    }
  });
  console.log("newcart", newCart);
  setCart(newCart);
  if (newCart.length === 0) {
    console.log("it is 0");
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
        details: [detailProduct, setDetailProduct],
        // handleDetail: handleDetail,
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
        clearCart: clearCart
       
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

const setDetailProductPage = (id) => {
  // const product = storeProducts.find((StoreProduct) => {
  //   if (StoreProduct.id === id) {
  //     return StoreProduct
  //   }
  // })
  // setDetailProduct(product)
};
