import React, { Component } from 'react';
import { useState } from 'react';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [spinner, setSpinner] = useState(false)
    const handleChange=(event) => {
        const { name, value } = event.target
        if (name === 'email') {
            setEmail(value)
        }
    }

    const handleSubmit = (event) => {
        setSpinner(true)
        event.preventDefault()
        const validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const result = validation.test(email)

        if (result) {
            auth.sendPasswordResetEmail(email).then(() => {
                setMessage('Email sent')
                setSpinner(false)
            }).catch(() => {
                setMessage('Please Retry')
                setSpinner(false)
            })
        } else {
            setMessage('incorrect email')
            setSpinner(false)
        }
      
    }
    return ( 
        <div className='forgot-pwod'>
            <div className="forgot-pwod-container">
                <form action="" onSubmit={handleSubmit}>
                    <h6 className='text-center'>Enter Your Email to reset your password</h6>
                    <input type="text" name='email' placeholder='Enter Email' value={email} onChange={handleChange} />
                    <p style={{color: 'red'}}>{message}</p>
                    <button className='mb-3 '>{spinner ? <Spinner
                        as="span"
                        animation="border"
                        variant='light'
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> : 'RESET PASSWORD'}</button>
                    <Link to='/account'>Back to Login</Link>
                </form>

            </div>
        </div>
     );
}
 
export default ForgotPassword;