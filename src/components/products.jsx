import React, { Component, useContext, useState, useEffect } from "react";
import Title from "./title";
import { ProductContext } from "./context";
import Details from "./details";
import Product from './product';
 
import { StoreProducts } from './../data';
import { Spinner } from "react-bootstrap";


const ProductList = () => {
  const { products } = useContext(ProductContext);
  const [storeProducts, setStoreProducts] = products 
 const [spinner, setSpinner] = useState(true)
    const all = useContext(ProductContext);
 

 
   
  return (
    <div className="container py-1">
      
        <div className="row">
          <Title title="Our products" />
        </div>
      <div className="row">
        {storeProducts.length === 0 ? <Spinner className='my-spinner'  animation="border" variant="warning" /> : 
          storeProducts.map((product) => {
            return <Product key={product.id} product={product} />;
          })
        }
         
        </div>
        
    </div>
  );
};

export default ProductList;
