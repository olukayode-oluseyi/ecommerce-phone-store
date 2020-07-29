import React from 'react';

import NavBar from './components/Navbar';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Route, Switch } from 'react-router-dom';
import "./App.css";
import ProductList from './components/products';
import Details from './components/details';
import Cart from './components/cart';
import Default from './components/default';
import Product from './components/product';
import Modal from './components/modal';


function App() {
  return (
    <>
      <NavBar/>
      <Switch>
        <Route path="/" exact component={ProductList} />
        <Route path="/details/:id" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route component={Default} />
      </Switch>
      <Modal/>
    </>
  );
}

export default App;
