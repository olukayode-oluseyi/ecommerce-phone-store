import React, { Component, useContext } from 'react';
import Checkout from './checkout';
import { ProductContext } from '../context';
import Login from './../accounts-components/login';

const CheckCheckout = () => {
    const {user, setUser} = useContext(ProductContext)
    return ( 
        <div>
           {user?<Checkout/>: <Login/> }
</div>
     );
}
 
export default CheckCheckout;