import React, { Component, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context';
import firebase, { db } from './../../firebase';

const Login = ({match}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  const { user, setUser } = useContext(ProductContext);
  const [invalidMessage, setInvalidMessage]= useState('')

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
        const docRef = db.collection('users').doc(data.user.uid)

        docRef.get().then((doc) => {
          if (doc.exists) {
           
            if (doc.data().status == 'valid') {
              setUser(data.user)
            } else {
              setInvalidMessage('you are not authorized')
              firebase.auth().signOut()
            }
            
          } else {
           
            setInvalidMessage('sorry cant identify email provided')
          }
        }).catch((error) => {
          
          setInvalidMessage('please try again')
        })
     
      }).catch((error) => {
        setInvalidMessage(error.message)
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
            <p style={{color: 'red'}} >{invalidMessage}</p>
            <button className="login-btn">LOGIN</button>
            <button className="login-WG-btn">LOGIN WITH GOOGLE</button>
          
              <Link to="/account/create">Create new Account</Link>
           
          </form>
        </div>
      </div>
    );
}
 
export default Login;