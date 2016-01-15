import React from 'react';// eslint-disable-line no-unused-vars
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';// eslint-disable-line no-unused-vars
import App from './App';// eslint-disable-line no-unused-vars
import configureStore from './store/StoreManager';

require('./../sass/style.scss');

let store = configureStore();

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('appContainer')
);
