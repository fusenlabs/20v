import { combineReducers } from 'redux';
import search from './search';
import player from './player';
import app from './app';

const rootReducer = combineReducers({
    search,
    player,
    app
});

export default rootReducer;
