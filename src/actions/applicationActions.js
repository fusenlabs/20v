export const SET_APPLICATION_STAGE = 'SET_APPLICATION_STAGE';

export function setApplicationStage(stage){
    return {
        type: SET_APPLICATION_STAGE,
        payload: { stage: stage }
    }
}

export function setAsyncApplicationStage(stage) {
    return (dispatch, getState) => {
        console.log(getState());
        setTimeout(()=>{
            dispatch(setApplicationStage(stage));
        },2000);
    }
}