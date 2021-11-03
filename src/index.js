import ReactDOM from 'react-dom';

import { CartProvider } from './store/store-context';

import './index.css';
import App from './App';

ReactDOM.render(
    <CartProvider>
        <App />
    </CartProvider>,
    document.getElementById('root'));
