import React, { Component, useContext, useEffect } from 'react';
import { ProductContext } from '../context';
import N95 from "../../images/N95 m.jpg";
import { useState } from 'react';
import { Link } from 'react-router-dom';

const OrderSummary = ({
  orderCode, deliveryFee,
  greenlight,
  deliveryType,
  paymentType,
  handleOrder,
}) => {
  console.log(orderCode)
  const { cart, setCart, subTotal, total, tax } = useContext(ProductContext);
  const [proceed, setProceed] = useState(true);
  const [mainTotal, setMainTotal] = useState(Number);
  useEffect(() => {
    settingBtnToGreen();
  });

  useEffect(() => {
    addingDeliveryFeeAndTotal();
  }, [deliveryFee]);

  const addingDeliveryFeeAndTotal = () => {
    let finalTotal = deliveryFee + total;

    setMainTotal(finalTotal);
  };

  const settingBtnToGreen = () => {
    if (greenlight && paymentType && deliveryType) {
      setProceed(true);
    } else {
      //setProceed(false)
    }
  };
  return (
    <div className="order-summary">
      <h4 className="text-center py-3">order summary</h4>
      <div className="order-summary-content">
        <div className="order-summary-content-container">
          {cart.map((item) => {
            return (
              <div key={item.id} className="img-and-details">
                <img src={item.img} alt="" />
                <div className="order-summary-product-content">
                  <p>{item.title}</p>
                  <p>price: {item.price}</p>
                  <p>Quantity: {item.count}</p>
                  <p>product-total: ${item.total}</p>
                </div>
              </div>
            );
          })}

          <div className="product-calc">
            <div className="subtotal">
              <p>sub-total</p>
              <p>${subTotal}</p>
            </div>
            <div className="tax">
              <p>Tax</p>
              <p>${tax}</p>
            </div>
            <div className="delivery-cost">
              <p>Delivery cost</p>
              <p>${deliveryFee}</p>
            </div>
            <div className="total">
              <p>total cost</p>
              <p>${mainTotal}</p>
            </div>
            <div className="process-order-btn">
              <Link to={`/process-order/${paymentType}/${mainTotal}/${orderCode}`}>
                <button
                  disabled={!proceed}
                  className={proceed ? "green-btn-active" : null}
                  onClick={handleOrder}
                >
                  PROCESS ORDER
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default OrderSummary;