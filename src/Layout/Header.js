import React, { Fragment } from 'react';

import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
import img from '../assets/meals.jpg'

const Header = (props) => {
    return (
        <Fragment>

            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton closeOverlay={props.closeOverlayHandler} />
            </header>
            <div className={classes['main-image']}>
                <img src={img} alt="A table full of delicious food!" />
            </div>

        </Fragment>
    );
}

export default Header;