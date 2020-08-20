import React, { Component, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { FaCartPlus } from "react-icons/fa";
import PropTypes from 'prop-types'
import { ProductContext } from './context';

import NumberFormat from 'react-number-format';
const Product = (props) => {

  
 
 
     const { title, img, price, inCart, id } = props.product;
  
 
 

   const { addToCart } = useContext(ProductContext);
 const {openModal, closeModal}= useContext(ProductContext)
    return (
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="card">
          <div className="img-container"  >
            <Link to={`/details/${id}`} >
              <img src={img} alt="" />
            </Link>
            <button onClick={() => {
              addToCart(id)
              openModal(id)
            }} disabled={inCart}>
              {inCart ? <p>in cart</p> : <FaCartPlus />}
            </button>
          </div>
          <div className="card-footer">
            <p>{title}</p>
            <h5><NumberFormat value={price} displayType={'text'}  thousandSeparator={true} prefix={'#'} />  </h5>
          </div>
        </div>
      </div>
    );
}
 
Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool
  }).isRequired
}

export default Product;


//onClick={() => { handleDetail(id) }}