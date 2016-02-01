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
    return (dispatch) => {
        dispatch(startSearching());
        Spotify.search(text, 'US', (tracks) => {
            {
                // delayed state change prevent UI changes before user navigates to player
                const delayedDispatch = ()=> {
                    dispatch(stopSearching());
                };
                setTimeout(delayedDispatch, 3000);
            }

            dispatch(returnSearch(tracks));
            dispatch(appActions.navigateToPlayer());
        });
    };
}
