import React, { Component, useState, useContext } from "react";
import firebase, { auth, provider, db } from "./../../firebase";
import { ProductContext } from "../context";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

const SignUp = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { user, setUser } = useContext(ProductContext);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [validatedEmail, setValidatedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [errorMessage2, setErrorMessage2] = useState('')
  const [spinner, setSpinner] = useState(false)
  useEffect(() => {
    inAppValidation();
  });
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

  const inAppValidation = () => {
    const validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const result = validation.test(email);
    setValidatedEmail(result);
    console.log(result);

    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      password.length > 3 &&
      phoneNumber.length > 9 &&
      validatedEmail
    ) {
      setBtnDisabled(false);
      setErrorMessage('please proceed')
      
    } else {
      setBtnDisabled(true);
      setErrorMessage('fill up all fields')
    }
  };

  const handleSubmit = (event) => {
    setSpinner(true)
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        setUser(data.user);
        console.log(data.user);
        db.collection("users")
          .doc(data.user.uid)
          .set({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            role: "user",
            status: "valid",
          })
          .then(() => {})
          .catch((error) => {
            var currentUser = firebase.auth().currentUser;
            currentUser.delete().then(() => { });
          });

        history.push("/account");
      }).catch((error) => {
        console.log(error)
        setErrorMessage2(error.message + ' please try again')
        setSpinner(false)
      })
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
              type="password"
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
          <p style={{
            color: 'red'
          }} >{errorMessage}</p> <br />
          <p style={{
            color: 'red'
          }} >{errorMessage2}</p>
          <button disabled={btnDisabled}>
          {spinner ? <Spinner
            as="span"
            animation="border"
            variant='light'
            size="sm"
            role="status"
            aria-hidden="true"
          /> : 'CREATE ACCOUNT'}</button>
        </form>
        {//<button disabled={true}>REGISTER WITH GOOGLE</button>//  
        }
      </div>
    </div>
  );
};

export default SignUp;
