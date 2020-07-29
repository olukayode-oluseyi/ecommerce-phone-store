import React, { Component, useContext } from 'react';
import { ProductContext } from './context';
import { StoreProducts } from './../data';
import { Link } from 'react-router-dom';

const Modal = () => {
    const { products } = useContext(ProductContext);
    const { modal } = useContext(ProductContext)
    const { modalId } = useContext(ProductContext);
    const { closeModal } = useContext(ProductContext);
     const [storeProducts, setStoreProducts] = products;
      
    return (
    <>
    {modal ?
     <div className="modalDiv">
        <div className="my-modal">
          <div className="modal-container">
            <h4>item added to cart</h4>
            {storeProducts.map((storeProduct) => {
                const {
                    title,
                    img,
                    price,
                    company,
                    info,
                    inCart,
                    id,
                } = storeProduct;
                if (modalId === id) {
                    console.log(storeProduct)
                    return (
                      <div key={id} className="modal-product-info">
                        <img src={img} alt="" />
                        <h4>{title}</h4>
                        <h3>Price: ${price} </h3>
                        <div className="modal-btns">
                          <Link to="/">
                            <button
                              onClick={() => {
                                closeModal(id);
                              }}
                            >
                              Store
                            </button>
                          </Link>
                          <Link to="/cart">
                            <button
                              onClick={() => {
                                closeModal(id);
                              }}
                            >
                              Go To Cart
                            </button>
                          </Link>
                        </div>
                      </div>
                    );
                }
            })}
          </div>
        </div>
      </div >: null
        }     
    </>
    );
}
 
export default Modal;