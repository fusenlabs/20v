import { ADD_SEARCH, RETURN_SEARCH, SEARCHING } from '../constants/search';

const initialState = {
    searchText: 'demo',
    isSearching: false,
    resultList: []
};

export default function search(state = initialState, action) {
    switch (action.type) {
        case ADD_SEARCH:
        case SEARCHING:
            return Object.assign({}, state, action);
        case RETURN_SEARCH:
            return Object.assign({}, state, { resultList: action.tracks });
        default:
            return state;
    }
}
