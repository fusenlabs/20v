import { CHANGE_APP_VIEW, VIEWS } from '../constants/app';

export function changeAppView(view = '') {
    return {
        type: CHANGE_APP_VIEW,
        view: view
    };
}
export function navigateToHome() {
    return changeAppView(VIEWS.HOME);
}

export function navigateToResults() {
    return changeAppView(VIEWS.RESULTS);
}

export function navigateToPlayer() {
    return changeAppView(VIEWS.PLAYER);
}
