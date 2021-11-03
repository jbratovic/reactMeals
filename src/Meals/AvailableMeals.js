import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import Spinner from '../UI/Spinner';

// 
/* const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    }
]; */

const AvailableMeals = () => {

    const [dummyMeals, setDummyMeals] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {

        setLoader(true);
        setError(false);

        fetch('https://repeat-c150c.firebaseio.com/meals.json', {
            method: 'GET',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        }).then(response => response.json())
            .then(responseData => {

                const mealsList = Object.keys(responseData).map(item => {

                    return {
                        id: item,
                        name: responseData[item].name,
                        description: responseData[item].description,
                        price: responseData[item].price
                    };
                });

                setDummyMeals(mealsList);
                setLoader(false);

            }).catch(error => {
                setError('Something went wrong!');
                setLoader(false);
            });

    }, []);

    const mealsList = dummyMeals.map((item) => <MealItem // ili {...item ->umisto ovih pojedinacnih propertija }
        key={item.id} id={item.id} name={item.name} description={item.description} price={item.price}>{item.name}</MealItem>);

    return (
        <section className={classes.meals}>
            <Card>
                {error && <p className={classes.center}>{error}</p>}
                {loader && <div className={classes.center}> <Spinner /> </div>}
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
