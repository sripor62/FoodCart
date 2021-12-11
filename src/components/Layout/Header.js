import React from 'react';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
const Header=(props) => {
return <React.Fragment>
    <header className={classes.header}>
        <h1>Cutu Chef</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
    </header>
    <div className={classes[`main-image`]}>
<img src="https://github.com/academind/react-complete-guide-code/blob/11-practice-food-order-app/extra-files/meals.jpg?raw=true" alt="A table full of tasty treat"/>
    </div>
</React.Fragment>
};
export default Header;