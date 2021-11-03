import React, { useState, useEffect, useContext } from 'react';

import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import storeContext from '../store/store-context';


const HeaderCartButton = (props) => {

    const [bump, setBump] = useState(false);

    const storeCtx = useContext(storeContext);

    const itemsInCart = storeCtx.mealsList.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity;
    }, 0);

    useEffect(() => {

        const timer = setTimeout(() => {
            setBump(true);
        }, 20);

        return () => {
            clearTimeout(timer);    
            setBump(false);
        }

    }, [storeCtx.mealsList]);

    const bumpCart = `${classes.button} ${bump && classes.bump}`;

    return (
        <button className={bumpCart} onClick={props.closeOverlay}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{itemsInCart}</span>
        </button>
    );
};

export default HeaderCartButton;
