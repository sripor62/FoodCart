import { useContext, useEffect, useState } from "react";
import CartContext from "../store/cart-context";

import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
const HeaderCartButton = (props) => {
    const[buttonIsHigh,setButtonIsHigh]=useState(false);
   
    const btnClasses=`${classes.button} ${buttonIsHigh ? classes.bump : ''}`
  const cartCtx = useContext(CartContext);
  const {items }=cartCtx;
  const noOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
 
  useEffect(() => {
      if(items.length === 0)
      {
          return;
      }
    setButtonIsHigh(true);
   const timer=setTimeout(()=> {setButtonIsHigh(false);},300);
   return () => {
       clearTimeout(timer);
   }
},[items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
