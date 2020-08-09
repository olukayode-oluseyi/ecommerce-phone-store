import React, { Component, useState, useEffect, useContext } from 'react';
import { db } from '../../firebase';
import { FaCheckCircle,  } from "react-icons/fa";
import { ProductContext } from '../context';
import state from "./locations.json";

const Address = ({
  retrieveUserInfoFromFirestore,
  phone,
  address,
  userState,
  userLGA,
  currentUser,
  user,
  id,
  firstName,
  lastName,
  handleChange,
  handleSwitch,
  greenlight,
}) => {
  const [locations, setLocations] = useState(state);
 

  return (
    <div className="account-details">
      <div className="account-details-container">
        <form>
          <div
            className={
              greenlight ? "icon-title icon-title-active" : "icon-title"
            }
          >
            <FaCheckCircle />
            <h5>1. Address Details</h5>
          </div>

          <div className="names">
            <label htmlFor="">
              First Name
              <input
                onChange={handleChange}
                type="text"
                name="firstName"
                value={firstName}
              />
            </label>

            <label htmlFor="">
              Last Name
              <input
                onChange={handleChange}
                type="text"
                name="lastName"
                value={lastName}
              />
            </label>
          </div>
          <div className="phone">
            <label htmlFor="">
              Phone
              <input
                onChange={handleChange}
                type="tel"
                name="phone"
                value={phone}
              />
            </label>
          </div>
          <div className="address">
            <label htmlFor="">
              Address
              <input
                type="text"
                onChange={handleChange}
                name="address"
                value={address}
              />
            </label>
          </div>
          <div className="state-lga">
            <label htmlFor="">
              State{" "}
              <select name="state" onChange={handleSwitch} id="select id">
                <option value="" selected disabled hidden>Choose State</option>
                {locations.map((state) => {
                  return (
                    <option
                      key={state.state.id}
                      id={state.state.id}
                      value={state.state.name}
                    >
                      {state.state.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <label>
              City/LGA{" "}
              <select name="lga" onChange={handleSwitch} id="">
                <option value="" selected disabled hidden>Choose Local Government Area</option>
                {locations[id].state.locals.map((lga) => {
                  return <option key={lga.id}>{lga.name}</option>;
                })}
              </select>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default Address;