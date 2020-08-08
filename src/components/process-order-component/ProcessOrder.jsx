import React, { Component, useContext, useState, useEffect } from "react";
import { PaystackButton } from "react-paystack";
import { ProductContext } from "../context";
import firebase from "./../../firebase";
import payStackImg from "./images/paystack2.png";
import SeeDetails from "./process-order-modal";
const ProcessOrder = ({ match }) => {
  const { user, clearCart } = useContext(ProductContext);
  const { mainTotal, paymentType, orderCode } = match.params;

  const publicKey = process.env.REACT_APP_PAYSTACK_ID;

  const [email, setEmail] = useState(user.email);
  const [order, setOrder] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(mainTotal * 100);
  const [payNowModal, setPayNowModal] = useState(false);

  useEffect(() => {
    const ordersRef = firebase.database().ref("orders/" + orderCode);
    ordersRef.on("value", (snapshot) => {
      const databaseOrders = snapshot.val();

      for (let databaseOrder in databaseOrders) {
        setName(databaseOrders.lastName);
        setPhone(databaseOrders.phone);
      }
    });
  }, []);

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
      clearCart();
      alert("Thanks for doing business with us! Come back soon!!");
      firebase
        .database()
        .ref("orders/" + orderCode)
        .update({
          status: "paid",
        });
    },

    onClose: () => alert("Wait! Don't leave :("),
  };

  const handleSeeDetailsModal = () => {
    setPayNowModal(true);
  };
  {
    if (paymentType === "Pay now with card") {
      return (
        <div className="payment-with-card">
          <div className="payment-with-card-container">
            <div className="payment-order-summary">
              <h6>ORDER SUMMARY</h6>
              <button onClick={handleSeeDetailsModal}>SEE DETAILS</button>
            </div>
            <div className="total-to-pay">
              <h4>TOTAL TO PAY</h4>
              <p>${mainTotal}</p>
            </div>
            <h6>PAYMENT METHOD</h6>
            <div className="payment">
              <PaystackButton {...componentProps} />
              <img src={payStackImg} alt="" />
            </div>
          </div>
          {payNowModal ? (
            <SeeDetails setPayNowModal={setPayNowModal} mainTotal={mainTotal} />
          ) : null}
        </div>
      );
    } else {
      return <div>pay with cash</div>;
    }
  }
};

export default ProcessOrder;
