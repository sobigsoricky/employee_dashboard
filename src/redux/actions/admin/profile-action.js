import actionTypes from "../actionTypes";

export const createProfile = (data) => async (dispatch) => {
    try {
        const response = await fetch('/api/admin/create-profile', { method: "POST", body: JSON.stringify({ data }) })
        const { success, message } = await response.json()

        if (success) {
            dispatch({ type: actionTypes.CREATE_ADMIN_PROFILE_SUCCESS, payload: message })
        } else if (!success) {
            dispatch({ type: actionTypes.CREATE_ADMIN_PROFILE_FAILURE, payload: message })
        }

    } catch (error) {
        dispatch({ type: actionTypes.CREATE_ADMIN_PROFILE_FAILURE })
    }
}