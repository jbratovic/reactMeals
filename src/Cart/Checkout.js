import React, { useState } from 'react';

import classes from './Checkout.module.css';
import useInput from '../hooks/use-input';

// custom hook example of form and validation
const Checkout = (props) => {

    const {
        inputValue: inputValueName,
        isInputValid: isUsernameValid,
        isInputValidAndBlur: isUsernameValidAndBlur,
        inputHandler: nameHandler,
        inputBlurHandler: nameBlurHandler
    } = useInput('name');

    const {
        inputValue: inputValueStreet,
        isInputValid: isStreetValid,
        isInputValidAndBlur: isStreetValidAndBlur,
        inputHandler: streetHandler,
        inputBlurHandler: streetBlurHandler
    } = useInput('street');

    const {
        inputValue: inputValuePostalCode,
        isInputValid: isPostalCodeValid,
        isInputValidAndBlur: isPostalCodeValidAndBlur,
        inputHandler: postalCodeHandler,
        inputBlurHandler: postalCodeBlurHandler
    } = useInput('postal');

    const {
        inputValue: inputValueCity,
        isInputValid: isCityValid,
        isInputValidAndBlur: isCityValidAndBlur,
        inputHandler: cityHandler,
        inputBlurHandler: cityBlurHandler
    } = useInput('city');

    let isFormValid = false;
    if (isUsernameValid && isStreetValid && isPostalCodeValid && isCityValid) { // all variables must be TRUE
        isFormValid = true;
    }

    const submitFormHandler = (event) => {
        event.preventDefault();

        if (!isFormValid) {
            return;
        }

        const userData = {
            user: inputValueName,
            street: inputValueStreet,
            postal: inputValuePostalCode,
            city: inputValueCity
        };
        props.checkoutUserData(userData);
    }

    const errorClassName = isUsernameValidAndBlur ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    const errorClassStreet = isStreetValidAndBlur ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    const errorClassPostalCode = isPostalCodeValidAndBlur ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    const errorClassCity = isCityValidAndBlur ? `${classes.control} ${classes.invalid}` : `${classes.control}`;


    return (
        <form className={classes.form} onSubmit={submitFormHandler}>

            <div className={errorClassName}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' value={inputValueName} onChange={nameHandler} onBlur={nameBlurHandler} />
                {isUsernameValidAndBlur && <p>Please insert valid name.</p>}
            </div>

            <div className={errorClassStreet}>
                <label htmlFor='name'>Street</label>
                <input type='text' id='street' value={inputValueStreet} onChange={streetHandler} onBlur={streetBlurHandler} />
            </div>

            <div className={errorClassPostalCode}>
                <label htmlFor='name'>Postal Code</label>
                <input type='number' id='postal' value={inputValuePostalCode} onChange={postalCodeHandler} onBlur={postalCodeBlurHandler} />
            </div>

            <div className={errorClassCity}>
                <label htmlFor='name'>City</label>
                <input type='text' id='city' value={inputValueCity} onChange={cityHandler} onBlur={cityBlurHandler} />
                {isCityValidAndBlur && <p>First letter must be uppercase.</p>}
            </div>

            <div className={classes.actions}>
                <button onClick={props.closeOverlay}>Cancel</button>
                <button>Confirm</button>
            </div>

        </form>
    );

}

export default Checkout;