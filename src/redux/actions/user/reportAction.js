import actionTypes from "../actionTypes";

export const handleSaveWorkReport = (data) => async (dispatch) => {
    try {
        const response = await fetch('/api/user/save-work-report/', { method: "POST", body: JSON.stringify({ data }) })
        const { message, success } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.SAVE_WORK_UPDATE_SUCCESS, payload: message })
        } else if (!success) {
            dispatch({ type: actionTypes.SAVE_WORK_UPDATE_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.SAVE_WORK_UPDATE_FAILURE, payload: error })
    }
}

export const handleGetWorkReport = () => async (dispatch) => {
    try {
        const response = await fetch('/api/user/get-work-update',);
        const { success, message, reports } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.GET_WORK_UPDATE_SUCCESS, payload: reports })
        } else if (!success) {
            dispatch({ type: actionTypes.GET_WORK_UPDATE_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_WORK_UPDATE_FAILURE, payload: error })
    }
}