import {ADD_SEARCH} from '../constants/search';

export function setSearch(text) {
    return {
        type: ADD_SEARCH,
        text
    };
}
