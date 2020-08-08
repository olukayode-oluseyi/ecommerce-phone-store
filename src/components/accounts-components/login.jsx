import React, { Component, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context';
import firebase from './../../firebase';

const Login = ({match}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  const { user, setUser } = useContext(ProductContext);
  

    const handleChange = (event) =>{
      const { name, value } = event.target
      if (name === 'email') {
        setEmail(value)
      }
      if (name === "password") {
        setPassword(value);
      }
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((data) => {
      setUser(data.user)
    })

  }

    return (
      <div className="login-component">
        <div className="container login-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={handleChange}
              name='email'
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              name='password'
            />
            <div className="rem-me-forget-pwod">
              <Link>Remember me?</Link>
              <Link>Forgot your password?</Link>
            </div>

            <button className="login-btn">LOGIN</button>
            <button className="login-WG-btn">LOGIN WITH GOOGLE</button>
          
              <Link to="/account/create">Create new Account</Link>
           
          </form>
        </div>
      </div>
    );
}
 
export default Login;