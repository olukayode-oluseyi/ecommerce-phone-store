import React, { Component } from 'react';
import { ProductContext } from "./context";
import { useState, useEffect, useContext } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const MainCart = () => {
    const { handleDeleteInCart } = useContext(ProductContext);

    const {
      cart,
      tax,
      subTotal,
      total,
      increaseCount,
      decreaseCount,
      clearCart,
    } = useContext(ProductContext);


    return (
        <>{cart.map((item) => {
            return (
                <div key={item.id} className="row">
            <div className="col-sm-2"><img src={item.img} alt=""/></div>
            <div className="col-sm-2"><p>{item.title}</p></div>
                <div className="col-sm-2"><p> <strong> ${item.price}</strong></p></div>
                <div className="col-sm-2"><button onClick={() => { decreaseCount(item.id)}}>-</button> <button>{item.count}</button> <button onClick={() => { increaseCount(item.id) }}>+</button> </div>
                    <div className="col-sm-2"><RiDeleteBinLine onClick={()=>{handleDeleteInCart(item.id)}}/> </div>
                <div className="col-sm-2"><p><strong>Item Total: ${item.total} </strong>  </p></div>
          </div>)
        })}
         
        </>
        
  
    );
}
 
export default MainCart;