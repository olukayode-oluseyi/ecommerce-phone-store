import React, { Component, useState, useContext, useEffect } from "react";
import state from "./locations.json";
import { ProductContext } from "../context";
import { db } from "../../firebase";
import { Spinner } from 'react-bootstrap';
import { set } from "store";

const AccountContent = () => {
    const [currentUser, setCurrentUser] = useState([]);
  const [locations, setLocations] = useState(state);
    const [id, setId] = useState(Number);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [userstate, setUserState] = useState('')
    const [userLGA, setUserLGA] = useState('')
  const { user, setUser } = useContext(ProductContext);
  const [spinner, setSpinner] = useState(false)
    const [message, setMessage] = useState('')
  const [update, setUpdate] = useState(false)

    useEffect(() => {
        retrieveUserInfoFromFirestore()
    }, [user])


    const retrieveUserInfoFromFirestore=() => {
        const docRef = db.collection('users').doc(user.uid)

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log('document data', doc.data())
            setCurrentUser(doc.data())
            } else {
                console.log('no such document')
            }
        }).catch((error) => {
            console.log('error getting document', error)
        })
    }

    const handleSwitch = (event) => {
      const { name, value } = event.target
   
        let id = event.target.selectedIndex;
        if (name === 'state') {
            setId(id-1);
            setUserState(value)
        }
        if (name === 'lga') {
            setUserLGA(value)
        }   
    };
    const handleChange = (event) => {
        const { name, value } = event.target
        
        if (name === 'firstName') {
            setFirstName(value)
        }
        if (name === 'lastName') {
            setLastName(value)
        }
        if (name === 'phone') {
            setPhone(value)
        }
        if (name === 'address') {
            setAddress(value)
        }
        
    }
  const handleSubmit = (event) => {
      setSpinner(true)
        event.preventDefault()
        const userRef = db.collection('users').doc(user.uid)

        return userRef.update({
            address: address,
            userState: userstate,
            userLGA: userLGA
        }).then(() => {
          setSpinner(false)
          setMessage('updated, thank you')
          console.log('document successfully updated')
          setUpdate(true)
        }).catch((error) => {
          setSpinner(false)
          console.log('error')
          set(error.message)
        })
    }
  return (
    <div className="account-content">
      <div className="account-details">
        <div className="account-details-container">
          <form onSubmit={handleSubmit}>
            <h5>Address Details</h5>
            <div className="names">
              <label htmlFor="">
                First Name
                <input type="text"  name='firstName' value={currentUser.firstName}  />
              </label>

              <label htmlFor="">
                Last Name
                <input type="text"  name='lastName' value={currentUser.lastName}  />
              </label>
            </div>
            <div className="phone">
              <label htmlFor="">
                Phone
                <input type="tel"  name='phone' value={currentUser.phoneNumber} />
              </label>
            </div>
            <div className="address">
              <label htmlFor="">
                Address
                <input type="text" onChange={handleChange} name='address' value={address} />
              </label>
            </div>
            <div className="state-lga">
              <label htmlFor="">
                State{" "}
                <select name='state' value={userstate} onChange={handleSwitch} id="select id">
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
              <label >
                City/LGA{" "}
                <select name="lga" value={userLGA} onChange={handleSwitch} id="">
                  <option value="" selected disabled hidden>Choose Local Govt Area</option>
                  {locations[id].state.locals.map((lga) => {
                    return <option key={lga.id} value={lga.name} >{lga.name}</option>;
                  })}
                </select>
              </label>
            </div>
            <p style={{color: 'red'}} >{message}</p>
            <button>  {spinner ? <Spinner
              as="span"
              animation="border"
              variant='light'
              size="sm"
              role="status"
              aria-hidden="true"
            /> : 'UPDATE'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountContent;
