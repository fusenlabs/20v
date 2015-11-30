import {combineReducers} from 'redux';
import search from './search';
import player from './player';

const rootReducer = combineReducers({
    search,
    player
});

export default rootReducer;
