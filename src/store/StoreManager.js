'use strict'
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import rootReducer from './../reducers';
import initialState from './initialState';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleWare
)(createStore);

export default function configureStore() {
    return createStoreWithMiddleware(rootReducer, initialState);
}
/*
class StoreManager {
    static createStore() {
        return createStore( rootReducer, initialState );
    }
}

export default StoreManager;*/