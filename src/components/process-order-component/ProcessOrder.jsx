import React, { Component, useContext, useState, useEffect } from "react";
import { PaystackButton } from "react-paystack";
import { ProductContext } from "../context";
import firebase from './../../firebase';

const ProcessOrder = ({ match }) => {
  const {user, clearCart} = useContext(ProductContext)
  const { mainTotal, paymentType, orderCode } = match.params;
  const publicKey = "pk_test_541e67ddb4b18d513cfa4d67ed80165fbe9c51b8";
  const [email, setEmail] = useState(user.email)
  const [order, setOrder] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState(mainTotal*100)

useEffect(() => {
  const ordersRef = firebase.database().ref("orders/" + orderCode);
  ordersRef.on("value", (snapshot) => {
    const databaseOrders = snapshot.val();
    console.log(databaseOrders)
    let newArray = [];
    for (let databaseOrder in databaseOrders) {
      setName(databaseOrders.lastName)
    setPhone(databaseOrders.phone)
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
        clearCart()
        alert("Thanks for doing business with us! Come back soon!!")
         firebase
           .database()
           .ref("orders/" + orderCode)
           .update({        
             status: "paid"
           });
      },
       
      
      onClose: () => alert("Wait! Don't leave :("),
    };
  {


    if (paymentType === "Pay now with card") {
      return (
        <div className="payment-with-card">
          <div className="payment-with-card-container">
            <div className="payment-order-summary">
              <h6>ORDER SUMMARY</h6>
              <button>SEE DETAILS</button>
            </div>
            <div className="total-to-pay">
              <h4>TOTAL TO PAY</h4>
              <p>${mainTotal}</p>
            </div>
            <h6>PAYMENT METHOD</h6>
            <div className="payment">
              <PaystackButton {...componentProps} />
            </div>
          </div>
        </div>
      );
    } else {
      return <div>pay with cash</div>;
    }
  }
};

export default ProcessOrder;
