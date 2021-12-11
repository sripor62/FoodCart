import React from 'react';
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { Fragment, useContext, useState } from "react";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
const[isCheckOut,setIsCheckOut]=useState(false);
const[isSubmiting,setIsSubmiting]=useState(false);
const[didSubmit,setDidSubmit]=useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const CartItemAddHandler = (item) => {
    cartCtx.addItem({...item,amount:1})
  };
  const CartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const orderHandler=() => {
setIsCheckOut(true);
  };
  const submitOrderHandler=async(data)=> {
    setIsSubmiting(true);
await fetch("https://foodapp-454cb-default-rtdb.firebaseio.com/meals/m1/orders.json",{
  method:'POST',
body:JSON.stringify({
  user:data,
  orderedItems:cartCtx.items
})


});
setIsSubmiting(false);
setDidSubmit(true);
};
  const modalActions=(
    <div className={classes.actions}>
    <button className={classes[`button--alt`]} onClick={props.onCloseCart}>
      Close
    </button>
    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
  </div>
  );
  const cartItems = (
    <ul className={classes[`cart-item`]}>
      {cartCtx.items.map((item) => (
        <CartItem
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={CartItemAddHandler.bind(null,item)}
          onRemove={CartItemRemoveHandler.bind(null,item.id)}
        />
      ))}
    </ul>
  );
  const cartModalHandler=<Fragment>
     {cartItems}
<div className={classes.total}>
        <span>Total Amount(rupee)</span>
        <span>{totalAmount}</span>
      </div>
{isCheckOut && <CheckOut onConfirm={submitOrderHandler} onCancel={props.onCloseCart}/>}
      {!isCheckOut && modalActions}
  </Fragment>
  const isSubmitingModalHandler=<p>Sending Your Data</p>
  const didSubmitModalHandler=<p>Successfully submitted your order..Our delivery boy is on the way!!!</p>
  return (
    <Modal onCloseCart={props.onCloseCart}>
     
      
     {!isSubmiting && !didSubmit && cartModalHandler}
     {isSubmiting && isSubmitingModalHandler}
     {!isSubmiting && didSubmit && didSubmitModalHandler}
    </Modal>
  );
};
export default Cart;
