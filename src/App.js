import React, { useContext } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import NavBar from './components/Navbar';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Route, Switch } from 'react-router-dom';
import "./App.css";
import ProductList from './components/products';
import Details from './components/details';
import Cart from './components/cart';
import Default from './components/default';

import Modal from './components/modal';
import Account from './components/accounts-components/UserAccount';
import SignUp from './components/accounts-components/signup';
import Checkout from './components/checkout-components/checkout';
import CheckCheckout from './components/checkout-components/checkCheckout';
import ProcessOrder from './components/process-order-component/ProcessOrder';
import { ProductContext } from './components/context';
import Login from './components/accounts-components/login';



function App() {
  const {user} = useContext(ProductContext)
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={ProductList} />
        <Route path="/details/:id" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route path="/account" exact component={Account} />
        <Route path="/account/create" component={SignUp} />
        <Route path="/checkout" component={CheckCheckout} />
        <Route
          path="/process-order/:paymentType/:mainTotal/:orderCode"
          component={user? ProcessOrder: Login}
        />
        <Route component={Default} />
      </Switch>
      <Modal />
    </>
  );
}

export default App;
