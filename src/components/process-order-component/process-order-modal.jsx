import React, { Component, useContext } from "react";
import { ProductContext } from "../context";
import { FaTimes, FaTimesCircle } from "react-icons/fa";

const SeeDetails = ({ mainTotal, setPayNowModal }) => {
  const { total, cart, tax } = useContext(ProductContext);

    const handleClose = () => {
      setPayNowModal(false)
  };
  return (
    <div className="see-details-modal">
      <div className="see-details-modal-container">
        <div className="see-details-modal-container2">
          <div className="title-and-close">
            <h5>Cart Detail</h5>
            <button onClick={handleClose}>
              <FaTimes />
            </button>
          </div>
          <div className="modal-cart-items">
            <h5>CART ITEMS</h5>
          </div>
          <div className="modal-items-products-qty">
            {cart.map((item) => {
              return (
                <div className="modal-items-products-qty2" key={item.id}>
                  <div className="pro-order-title-and-price">
                    <p>{item.title}</p> <h6>${item.price}</h6>
                  </div>
                  <div className="pro-order-qty">
                    <p>quantity</p> <h6>{item.count}</h6>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="shipping-fee">
            <p>Shipping fee</p>
            <h6>${mainTotal - total}</h6>
          </div>
          <div className="tax-fee">
            <p>Tax fee</p>
            <h6>${tax}</h6>
          </div>
          <div className="order-total">
            <p>ORDER TOTAL</p>
            <h6>${mainTotal}</h6>
          </div>
          <div className="payment-summary">
            <h5>PAYMENT SUMMARY</h5>
          </div>
          <div className="modal-total-to-pay">
            <p>TOTAL TO PAY</p>
            <h6>${mainTotal}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeDetails;
