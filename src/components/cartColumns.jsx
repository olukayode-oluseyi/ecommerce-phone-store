import React, { Component } from 'react';

const CartColumns = () => {
    return (
      <div className="row">
        <div className="col-sm-2 text-center"><h6>PRODUCTS</h6></div>
        <div className="col-sm-2 text-center"><h6>NAME OF PRODUCTS</h6></div>
        <div className="col-sm-2 text-center"><h6>PRICE</h6></div>
        <div className="col-sm-2 text-center"><h6>QUANTITY</h6></div>
        <div className="col-sm-2 text-center"><h6>REMOVE</h6></div>
        <div className="col-sm-2 text-center"><h6>TOTAL</h6></div>
      </div>
    );
}
 
export default CartColumns;