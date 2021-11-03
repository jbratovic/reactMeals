import React, { useState, useContext } from 'react';

import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import storeContext from '../store/store-context'
import CartItem from './CartItem';
import Checkout from './Checkout';
import badge from '../assets/badge.png'

const Cart = (props) => {

    const storeCtx = useContext(storeContext);
    const [hasItems, setHasItems] = useState(false);
    const [orderSuccessful, setOrderSuccessful] = useState(false);


    const cartItemAddHandler = (item) => {
        storeCtx.addItem({ ...item, quantity: 1 });
    }

    const cartItemRemoveHandler = (id) => {
        storeCtx.removeItem(id);
    }

    const orderHandler = () => {
        setHasItems(true);
    }

    const checkoutUserDataHandlerAndSubmitForm = (userData) => {

        const submitData = {
            user: userData,
            order: { ...storeCtx.mealsList } // converf from array [0: {}, 1: {}, 2: {}] into object { 0: {}, 1: {}, 2: {} }
        };

        fetch('https://repeat-c150c.firebaseio.com/orders.json', {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submitData)
        }).then(response => response.json())
            .then(responseDate => {
                setOrderSuccessful(true);
                storeCtx.clearItemsAfterOrder();
            })
            .catch(error => console.log(error));
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {storeCtx.mealsList.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onRemove={() => cartItemRemoveHandler(item.id)} // cartItemRemoveHandler.bind(null, item.id)
                    onAdd={cartItemAddHandler.bind(null, item)}
                >
                    {item.name}
                </CartItem>
            ))}
        </ul>
    );

    return (
        <Modal>
            {cartItems}

            {/* hide total amount after order is successful */}
            {!orderSuccessful && <div className={classes.total}>
                <span>Total Amount</span>
                <span>{storeCtx.totalAmount.toFixed(2)}</span> {/* no need for converting into number with "+" sign because this is string "+storeCtx.totalAmount" */}
            </div>}

            {/* buttons for closing overlay and show form */}
            {!hasItems && <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.closeOverlayHandler}>Close</button>
                <button className={classes.button} onClick={orderHandler}>Order</button>
            </div>}

            {/* overlay for successfully ordered food */}
            {hasItems && orderSuccessful && <div className={classes.actions}>
                <div className={classes.successful}>
                    <img src={badge} alt="Badge" />
                    <p>Thank you for ordering food!</p>
                    <button className={classes['button--alt']} onClick={props.closeOverlayHandler}>Finish</button>
                </div>

            </div>}

            {hasItems && !orderSuccessful && <Checkout checkoutUserData={checkoutUserDataHandlerAndSubmitForm} closeOverlay={props.closeOverlayHandler} />}



        </Modal>
    );
};

export default Cart;
