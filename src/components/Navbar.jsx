import React, { Component, useContext } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaCartPlus } from "react-icons/fa";
import logo from "./../logo.svg";
import { Link } from "react-router-dom";
import { ProductContext } from "./context";

const NavBar = () => {
  const { cart } = useContext(ProductContext);
  return (
    <Navbar bg="secondary" className="navbar-dark" expand="sm">
      <Link to="/">
        <Navbar.Brand>
          <img src={logo} alt="" />
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/account" className="nav-link my-nav-link">
            Account
          </Link>
          <Link to="/" className="nav-link my-nav-link">
            Products
          </Link>
          <Link to="/cart" className="nav-link">
            <button className="btn btn-warning">
              <FaCartPlus /> My Cart{" "}
              <span className="badge badge-danger ml-2">{cart.length}</span>
            </button>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
