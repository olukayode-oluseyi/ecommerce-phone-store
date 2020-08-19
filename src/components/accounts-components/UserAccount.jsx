import React, { Component, useState, useContext } from 'react';
import Login from './login';
import SignUp from './signup';
import AccountContent from './accountContent';
import { ProductContext } from '../context';

const Account = () => {
   const { user, setUser } = useContext(ProductContext)
    return (
      <div className="account-component">
        {user ? <AccountContent/> : <Login/>}
      </div>
    );
}
 
export default Account;