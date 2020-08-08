import React, { Component } from 'react';
import { FaTruck, FaCheckCircle, FaStoreAlt } from "react-icons/fa";
const Delivery = ({handleChange, deliveryType}) => {
    return (
      <div className="delivery-container">
        <form>
          <div className={deliveryType ? "icon-title icon-title-active" : "icon-title"}>
            <FaCheckCircle />
            <h5>2. Delivery Method</h5>
          </div>

          <p>How do you want your order delivered?</p>
          <div className="door-delivery">
            <label>
              <input
                onChange={handleChange}
                type="radio"
                name="delivery"
                value="Door delivery"
              />{" "}
              <FaTruck />
              <h6>Door Delivery</h6>
            </label>
          </div>
          <div className="pick-up-delivery">
            <label>
              <input
                onChange={handleChange}
                type="radio"
                name="delivery"
                value="pick up delivery"
              />{" "}
              <FaStoreAlt />
              <h6>PickUp Delivery</h6>
            </label>
          </div>
        </form>
      </div>
    );
}
 
export default Delivery;