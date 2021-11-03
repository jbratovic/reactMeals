import React, { useRef } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';


const MealItemForm = (props) => {

    const mealQuantityRef = useRef();

    const submitHandler = event => {
        event.preventDefault();

        props.mealData(+mealQuantityRef.current.value);

    }


    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={mealQuantityRef}
                label='Amount'
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }}
            />
            <button>+ Add</button>
        </form>
    );
};

export default MealItemForm;
