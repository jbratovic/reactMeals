import React, { Fragment, useState } from 'react';

import Header from './Layout/Header';
import Cart from './Cart/Cart';
import Meals from './Meals/Meals';

function App() {

    const [cartIsShown, setCartIsShown] = useState(false);

    const closeCartOverlayHandler = () => {
        setCartIsShown(prevState => !prevState);
    }

    return (
        <Fragment>
            { cartIsShown && <Cart closeOverlayHandler={closeCartOverlayHandler} />}
            <Header closeOverlayHandler={closeCartOverlayHandler} />
            <main>
                <Meals />
            </main>
        </Fragment>
    );
}

export default App;
