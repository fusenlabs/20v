import { ADD_SEARCH, RETURN_SEARCH, SEARCHING } from '../constants/search';
import Spotify from '../core/Spotify';
import * as appActions from './app';

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

export function startSearching() {
    return {
        type: SEARCHING,
        isSearching: true
    };
}

export function stopSearching() {
    return {
        type: SEARCHING,
        isSearching: false
    };
}

export function fetchSearch(text) {
    startSearching();
    return (dispatch) => {
        // dispatch(setSearch(text));
        Spotify.search(text, 'US', (tracks) => {
            stopSearching();
            dispatch(returnSearch(tracks));
            dispatch(appActions.navigateToPlayer());
        });
    };
}
