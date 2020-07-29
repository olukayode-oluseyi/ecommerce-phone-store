import React, { Component } from 'react';

const Title = (props) => {
    return (
      <>
        <h3 className="text-center col-10 mx-auto my-2 text-title">{props.title} </h3>
      </>
    );
}
 
export default Title;