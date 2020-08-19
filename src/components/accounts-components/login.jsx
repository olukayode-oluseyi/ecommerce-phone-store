import React, { Component, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context';
import firebase, { db, auth, provider } from './../../firebase';
import { Button, Spinner } from 'react-bootstrap';

const Login = ({match}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  const { user, setUser } = useContext(ProductContext);
  const [invalidMessage, setInvalidMessage] = useState('')
  const [spinner, setSpinner] = useState(false)

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
    setSpinner(true)
    event.preventDefault()
   console.log('clicked')
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((data) => {
        const docRef = db.collection('users').doc(data.user.uid)

        docRef.get().then((doc) => {
          if (doc.exists) {
           
            if (doc.data().status == 'valid') {
              setSpinner(false)
              setUser(data.user)
            } else {
              setSpinner(false)
              setInvalidMessage('you are not authorized')
              firebase.auth().signOut()
            }
            
          } else {
            setSpinner(false)
            setInvalidMessage('sorry cant identify email provided')
          }
        }).catch((error) => {
          setSpinner(false)
          setInvalidMessage('please try again')
        })
     
      }).catch((error) => {
        setSpinner(false)
        setInvalidMessage(error.message + ' please try again')
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
            
              <Link to='/account/forgot-password'>Forgot your password?</Link>
            </div>
            <p style={{color: 'red'}} >{invalidMessage}</p>
            <button style={{ backgroundColor: 'rgb(255, 217, 0)'}} variant="warning">
              {spinner? <Spinner
                as="span"
                animation="border"
                variant='light'
                size="sm"
                role="status"
                aria-hidden="true"
              /> : 'LOGIN'}
             
            </button>
            
            {//<button disabled={true} className="login-WG-btn" onClick={hanldeLogiWithGoogle}>LOGIN WITH GOOGLE</button>
            }
              <Link to="/account/create">Create new Account</Link>
           
          </form>
        </div>
      </div>
    );
}
 
export default Login;



 // const hanldeLogiWithGoogle = () => { 
  //   auth
  //     .signInWithPopup(provider)
  //     .then((data) => {  
  //       const docRef = db.collection('users').doc(data.user.uid)

  //       docRef.get().then((doc) => {
  //         if (doc.exists) {

  //           if (doc.data().status == 'valid') {
  //             setUser(data.user)
  //           } else {
  //             setInvalidMessage('you are not authorized')
  //             firebase.auth().signOut()
  //           }

  //         } else {

  //           setInvalidMessage('sorry cant identify email provided')
  //         }
  //       }).catch((error) => {

  //         setInvalidMessage('please try again')
  //       })
  //     })
  //     .catch((error) => {

  //       setInvalidMessage(error.message)
  //     });
  // }