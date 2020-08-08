import React, { Component, useState, useContext } from "react";
import firebase, { auth, provider, db } from "./../../firebase";
import { ProductContext } from "../context";
import { useHistory } from "react-router-dom";

const SignUp = () => {
    const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const { user, setUser } = useContext(ProductContext);
    
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "firstName") {
      setFirstName(value);
    }
    if (name === "lastName") {
      setLastName(value);
    }
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "phoneNumber") {
      setPhoneNumber(value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
        .then((data) => {
            
            setUser(data.user);
            console.log(data.user)
          db.collection('users').doc(data.user.uid).set({
              firstName: firstName,
              lastName: lastName,
              email: email,
              phoneNumber: phoneNumber,
              role: 'user'
          }).then(() => {
             
          }).catch(() => {
              var currentUser = firebase.auth().currentUser
              currentUser.delete().then(() => {
                
            })
          })
           const usersRef = firebase.database().ref("users");
           const user = {
             firstName: firstName,
             lastName: lastName,
             email: email,
             phoneNumber: phoneNumber,
             role: 'user'
           };
           usersRef
             .push(user)
             .then(function (doc) {
               console.log(doc, "Document successfully written!");
              
             })
             .catch(function (error) {
                   var currentUser = firebase.auth().currentUser;
                   currentUser.delete().then(() => {});
               console.error("Error writing document: ", error);
             });
          
                    history.push("/account");
        
      });
  };

  return (
    <div className="signup-component">
      <div className="container signup-container">
        <form action="" onSubmit={handleSubmit}>
          <div className="upper-info">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={firstName}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={lastName}
            />
          </div>
          <div className="lower-info">
            <input
              type="text"
              placeholder="E-mail"
              name="email"
              onChange={handleChange}
              value={email}
            />
            <input
              type="text"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={password}
            />
          </div>
          <div className="phone-no">
            <input
              type="tel"
              placeholder="Phone Number (optional)"
              name="phoneNumber"
              onChange={handleChange}
              value={phoneNumber}
            />
          </div>

          <button>CREATE ACCOUNT</button>
        </form>
        <button>REGISTER WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default SignUp;
