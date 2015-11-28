export const SET_APPLICATION_STAGE = 'SET_APPLICATION_STAGE';

export function setApplicationStage(stage){
    return {
        type: SET_APPLICATION_STAGE,
        payload: { stage: stage }
    }
}