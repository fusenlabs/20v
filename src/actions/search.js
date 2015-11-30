import {ADD_SEARCH, RETURN_SEARCH} from '../constants/search';
import Spotify from '../core/Spotify';

export function setSearch(searchText) {
    return {
        type: ADD_SEARCH,
        searchText
    };
}

export function returnSearch(tracks) {
    return {
        type: RETURN_SEARCH,
        tracks
    };
}

export function fetchSearch(text) {
    return (dispatch) => {
        dispatch(setSearch(text));
        Spotify.search(text, 'US', (tracks) => {
            dispatch(returnSearch(tracks));
        });
    };
}
