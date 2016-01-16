import { CHANGE_PLAYER_STATUS } from '../constants/player';

const initialState = {
    isOpen: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_PLAYER_STATUS:
            return Object.assign({}, state, action);
        default:
            return state;
    }
}
