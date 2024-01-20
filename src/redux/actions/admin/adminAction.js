import actionTypes from "../actionTypes";

export const getAdmins = () => async (dispatch) => {
    try {
        const response = await fetch('/api/admin/get-admins')
        const { success, message, admins } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.GET_ADMINS_SUCCESS, payload: admins })
        } else if (!success) {
            dispatch({ type: actionTypes.GET_ADMINS_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_ADMINS_FAILURE, payload: error.message })
    }
}