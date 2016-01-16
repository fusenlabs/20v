import { CHANGE_PLAYER_STATUS } from '../constants/player';

export function changePlayerStatus(isOpen = false) {
    return {
        type: CHANGE_PLAYER_STATUS,
        isOpen: isOpen
    };
}

export function openPlayer() {
    return changePlayerStatus(true);
}

export function closePlayer() {
    return changePlayerStatus(false);
}
