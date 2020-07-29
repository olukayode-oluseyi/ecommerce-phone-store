import React, { Component } from 'react';

const Default = (props) => {
    console.log(props)
    return ( 
        <div className='default-page'>
            <h3 className='text-center'>
                404
           </h3>
            <h3 className='text-center'>
                not found :(
            </h3>
            <h3  className='text-center'>
                the path {props.location.pathname} does not exist on this website
            </h3>
        </div>
     );
}
 
export default Default;