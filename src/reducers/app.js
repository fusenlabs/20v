import { CHANGE_APP_VIEW, VIEWS } from '../constants/app';

const initialState = {
    view: VIEWS.HOME
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_APP_VIEW:
            return Object.assign({}, state, action);
        default:
            return state;
    }
}
