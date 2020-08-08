import React, { Component, useState, useContext, useEffect } from "react";
import Address from "./Address";
import Delivery from "./Delivery";
import Payment from "./payment";
import { ProductContext } from "../context";
import { db } from "../../firebase";
import OrderSummary from "./orderSummary";
import firebase from './../../firebase';

const Checkout = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const { user, setUser } = useContext(ProductContext);
  const { cart, setCart } = useContext(ProductContext);
  const [id, setId] = useState(Number);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [userstate, setUserState] = useState("");
  const [userLGA, setUserLGA] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(Number);
  const [orderCode, setOrderCode] = useState('')
  useEffect(() => {
    retrieveUserInfoFromFirestore()
  }, [user]);

  useEffect(() => {
    handleDeliveryFee();
  }, [userstate]);

  useEffect(() => {
    handleDeliveryFee();
     
  }, [deliveryType]);

  useEffect(() => {
    if (
      phone.length > 0 &&
      address.length > 0 &&
      userLGA.length > 0 &&
      useState.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0
    ) {
      setGreenlight(true);
    } else {
      setGreenlight(false);
    }
  });
  const retrieveUserInfoFromFirestore = () => {
    const docRef = db.collection("users").doc(user.uid);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCurrentUser(doc.data());
        } else {
        }
      })
      .catch((error) => {});
  };

  const handleDeliveryFee = () => {
    const southWest = [
      "Osun State",
      "Oyo State",
      "Ondo State",
      "Lagos State",
      "Ekiti State",
      "Ogun State",
    ];
    const southEast = [
      "Enugu State",
      "Imo State",
      "Ebonyi State",
      "Anambra State",
      "Abia State",
    ];
    const SouthSouth = [
      "Delta State",
      "Edo State",
      "Cross River State",
      "Rivers State",
      "Akwa Ibom State",
      "Bayelsa State",
    ];
    const northCentral = [
      "Kwara State",
      "Plateau State",
      "Niger State",
      "FCT",
      "Nasarawa State",
      "Benue State",
      "Kogi State",
    ];
    const northEast = [
      "Yobe State",
      "Borno State",
      "Taraba State",
      "Bauchi State",
      "Zamfara State",
      "Adamawa State",
      "Gombe State",
    ];
    const northWest = [
      "Sokoto State",
      "Kano State",
      "Kaduna State",
      "Kebbi State",
      "Jigawa State",
      "Katsina State",
    ];
    const SWvalue = southWest.includes(userstate);
    const SEvalue = southEast.includes(userstate);
    const SSvalue = SouthSouth.includes(userstate);
    const NCvalue = northCentral.includes(userstate);
    const NEvalue = northEast.includes(userstate);
    const NWvalue = northWest.includes(userstate);

    if (deliveryType === "pick up delivery") {
      setDeliveryFee(0);
    } else {
      if (SWvalue) {
        setDeliveryFee(5);
      }
      if (SEvalue) {
        setDeliveryFee(7);
      }
      if (SSvalue) {
        setDeliveryFee(9);
      }
      if (NCvalue) {
        setDeliveryFee(10);
      }
      if (NEvalue) {
        setDeliveryFee(20);
      }
      if (NWvalue) {
        setDeliveryFee(16);
      }
    }
  };

  const handleSwitch = (event) => {
    const { name, value } = event.target;

    let id = event.target.selectedIndex;
    if (name === "state") {
      setId(id);
      setUserState(value);
    }
    if (name === "lga") {
      setUserLGA(value);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
   
    if (name === "firstName") {
      setFirstName(currentUser.firstName);
    }
    if (name === "lastName") {
      setLastName(currentUser.lastName);
    }
    if (name === "phone") {
      setPhone(currentUser.phoneNumber);
    }
    if (name === "address") {
      setAddress(value);
    }
  };
  const handleChange2 = (event) => {
    
    const { name, value } = event.target;
    if (name === "delivery") {
      setDeliveryType(value);
    }
    if (name === "payment") {
      setPaymentType(value);
    }
     var rString = randomString(
       32,
       "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
     );
     
     setOrderCode(rString);
  };
  const handleOrder = () => {
  
      firebase
        .database()
        .ref("orders/" + orderCode)
        .set({
          firstName: firstName,
          lastName: lastName,
          status: 'not paid',
          deliveryType: deliveryType,
          paymentType: paymentType,
          userLGA: userLGA,
          userstate: userstate,
          address: address,
          phone: phone,
          cart: cart

          
        });
    
    
  

  }
  function randomString(length, chars) {
      var result = "";
      for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }
  const [greenlight, setGreenlight] = useState(false);

  return (
    <div className="checkout">
      <div className=" container">
        <div className="row address-content">
          <div className="col-md-8">
            <h4 className="text-center py-3">CHECKOUT</h4>
            <Address
              handleSwitch={handleSwitch}
              retrieveUserInfoFromFirestore={retrieveUserInfoFromFirestore}
              handleChange={handleChange}
              address={address}
              userstate={userstate}
              phone={phone}
              userLGA={userLGA}
              lastName={lastName}
              firstName={firstName}
              id={id}
              currentUser={currentUser}
              user={user}
              greenlight={greenlight}
            />
            <Delivery
              deliveryType={deliveryType}
              handleChange={handleChange2}
              deliveryFee={deliveryFee}
              setDeliveryFee={setDeliveryFee}
            />
            <Payment paymentType={paymentType} handleChange={handleChange2} />
          </div>
          <div className="col-md-4">
            <OrderSummary
              paymentType={paymentType}
              greenlight={greenlight}
              deliveryType={deliveryType}
              deliveryFee={deliveryFee}
              handleOrder={handleOrder}
              orderCode={orderCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
