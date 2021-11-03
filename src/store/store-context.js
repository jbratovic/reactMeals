import { createContext, useReducer } from 'react';


const storeContext = createContext({

    mealsList: [],
    totalAmount: 0,
    addItem: () => { },
    removeItem: () => { },
    clearItemsAfterOrder: () => {}

});

export default storeContext;




const defaultCartState = {
    items: [],
    totalAmount: 0
};

const initialState = (state = defaultCartState, action) => {
    
    if (action.type === 'ADD_ITEM') {

        let addItem = [];

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const amount = state.totalAmount + action.item.price * action.item.quantity; // bolje rijesenje 

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity += 1
            };
            addItem = [...state.items];
            addItem[existingCartItemIndex] = updatedItem;

        } else {
            addItem = [...state.items, action.item];
        }

        // alternativa ovom rijesenju je ono gori, ovo uvik kasni na pocetku jer state nije updejtan, bolje rijesenje je ovo gori
        /*  const amount = state.items.reduce((accumulator, currentValue) => {
             console.log("currentValue:", currentValue);
             return accumulator + currentValue.price * currentValue.quantity;
         }, 0); */

        return {
            items: addItem,
            totalAmount: amount
        };
    }
  
    if (action.type === 'REMOVE_ITEM') {

        let removeItem = [];

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const amount = state.totalAmount - existingCartItem.price; // bolje rijesenje 

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity -= 1
            };
            removeItem = [...state.items];
            removeItem[existingCartItemIndex] = updatedItem;
        }

        if(existingCartItem.quantity < 1) {
            removeItem = state.items.filter(items => items.id !== action.id);
        }

        return {
            items: removeItem,
            totalAmount: amount
        };
    }

    if(action.type === 'RESET_ORDERS') {
        return defaultCartState;
    }

    return state;
}

export const CartProvider = (props) => {

    const [meal, setMeal] = useReducer(initialState, defaultCartState);

    const addItemHandler = (meal) => {

        setMeal({ type: 'ADD_ITEM', item: meal });
    }

    const removeItemHandler = (id) => {

        setMeal({ type: 'REMOVE_ITEM', id: id });
    }

    const clearItemsAfterOrderHandler = () => {
        setMeal({type: 'RESET_ORDERS'});
    }

    const contextValue = {
        mealsList: meal.items,
        totalAmount: meal.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearItemsAfterOrder: clearItemsAfterOrderHandler
    }
    
    return (
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    );
}