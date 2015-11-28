import {combineReducers} from 'redux';
import applicationReducer from './applicationReducer';

const rootReducer = combineReducers({
    application: applicationReducer
});

export default rootReducer;