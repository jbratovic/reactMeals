import React, {useContext} from 'react';


import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import storeContext from '../../store/store-context';


const MealItem = (props) => {

    const price = `$${props.price.toFixed(2)}`;

    const storeCtx = useContext(storeContext);

    const mealDataHandler = (quantity) => {
        storeCtx.addItem({...props, quantity: quantity});
    }


    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm mealData={mealDataHandler} {...props} /* svi propertiji {...props}, ili samo pojedinacni prosljediti id={props.id} */  />
            </div>
        </li>
    );
};

export default MealItem;
