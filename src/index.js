import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/StoreManager';

let store = configureStore();

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('appContainer')
);
