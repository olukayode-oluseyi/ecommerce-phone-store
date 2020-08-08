import React, { Component } from 'react';
import { FaCreditCard, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";


const Payment = ({ handleChange, paymentType }) => {
 
  return (
    <div className="delivery-container payment-method">
      <form>
        <div className= {paymentType? "icon-title icon-title-active": "icon-title" } >
          <FaCheckCircle />
          <h5> 3. Payment Method</h5>
        </div>

        <p>How do you want to pay for yor order?</p>
        <div className="door-delivery">
          <label>
            <input
              type="radio"
              onChange={handleChange}
              name="payment"
              value="Pay now with card"
            />{" "}
            <FaCreditCard />
            <h6>Pay now with card</h6>
          </label>
        </div>
        <div className="pick-up-delivery">
          <label>
            <input
              disabled={true}
              onChange={handleChange}
              type="radio"
              name="payment"
              value="Pay with bank or mobile transfer"
            />{" "}
            <FaMoneyBillWave />
            <h6>Pay with bank or mobile transfer</h6>
          </label>
        </div>
      </form>
    </div>
  );
};
 
export default Payment;