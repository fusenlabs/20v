import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import StoreManager from './store/StoreManager';

let store = StoreManager.createStore();

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('appContainer')
);
