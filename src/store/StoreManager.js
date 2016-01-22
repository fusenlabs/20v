import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import rootReducer from './../reducers';

const createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleWare),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore() {
    return createStoreWithMiddleware(rootReducer);
}
