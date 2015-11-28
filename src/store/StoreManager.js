'use strict'
import { createStore } from 'redux';
import initialState from './initialState';
import rootReducer from './../reducers';

class StoreManager {
    static createStore() {
        return createStore( rootReducer, initialState );
    }
}

export default StoreManager;