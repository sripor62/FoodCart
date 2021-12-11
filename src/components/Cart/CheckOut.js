import classes from './CheckOut.module.css';
import {useRef, useState} from 'react';
const isEmpty=value => value.trim().length === '';
const isFiveCharLong=value => value.trim().length !== 5;
const Checkout = (props) => {
 const [formValidity,setFormInputValidity]=useState({
     name:true,
     street:true,
     city:true,
     pinCode:true,
 }
 );
 
const nameInputRef=useRef();
const streetInputRef=useRef();
const cityInputRef=useRef();
const pinInputRef=useRef();
const confirmHandler = (event) => {
    event.preventDefault();
    const eneteredName=nameInputRef.current.value;
    const enteredStreet=streetInputRef.current.value;
    const enteredPin=pinInputRef.current.value;
    const enteredCity=cityInputRef.current.value;
    
    const enteredNameIsValid=!isEmpty(eneteredName);
    const enteredPinIsValid=!isFiveCharLong(enteredPin);
    const enteredCityIsValid=!isEmpty(enteredCity);
    const enteredStreetIsValid=!isEmpty(enteredStreet);

   
    setFormInputValidity({
        name:enteredNameIsValid,
        street:enteredStreetIsValid,
        pinCode:enteredPinIsValid,
        city:enteredCityIsValid,
       
    });
    const formIsValid=enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPinIsValid;
   
  
    if(!formIsValid){
        return;
    }
    props.onConfirm({
        name:eneteredName,
        street:enteredStreet,
        city:enteredCity,
        pinCode:enteredPin,
    })
  };
 
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formValidity.name ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name'ref={nameInputRef} />
        {!formValidity.name && <p>Please enter a avalid name</p>}
      </div>
      <div className={`${classes.control} ${formValidity.street ? '' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street'ref={streetInputRef}/>
        {!formValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={`${classes.control} ${formValidity.pinCode ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal'ref={pinInputRef} />
        {!formValidity.pinCode && <p>Please enter a valid code</p>}
      </div>
      <div className={`${classes.control} ${formValidity.street ? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;