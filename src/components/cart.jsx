import React, { Component, useContext } from 'react';
import { ProductContext } from './context';
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Title from './title';
import CartColumns from './cartColumns';
import MainCart from './mainCart';

const Cart = () => {
  const { cart, tax,subTotal, total, increaseCount, decreaseCount, clearCart } = useContext(ProductContext);
  const { handleDeleteInCart } = useContext(ProductContext)
  const [decider, setDecider] = useState(true)
  useEffect(() => {
    handleCartColumns()
  }, [])

   const handleCartColumns = () => {
     window.addEventListener("load", () => {
       if (window.innerWidth < 768) {
         setDecider(false);
       } else {
         setDecider(true);
       }
     });
   };
  return (

   

    <div className="container-fluid cart-page">
      {cart.length === 0 ? (
        <Title title="YOUR CART IS EMPTY" />
      ) : (
        <>
          <Title title="YOUR CART" />
            {decider? <CartColumns />: null}
            {console.log(window.outerWidth)}
            <MainCart />
          <div className="row">
            <div className="subtotal-tax-total">
              <Link to="/">
                <button className="btn btn-danger" onClick={clearCart}>
                  clear cart
                </button>
              </Link>
              <p>subtotal: ${subTotal}</p>
              <p>tax: ${tax}</p>
              <p>total: ${total}</p>
              <a href="https://www.paypal.com">to paypal</a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
 
export default Cart;