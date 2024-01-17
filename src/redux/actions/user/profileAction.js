import actionTypes from "../actionTypes";

export const getUserData = (id) => async (dispatch) => {
    try {
        const response = await fetch('/api/admin/get-employee-details', { method: 'POST', body: JSON.stringify({ id }) })

        const { success, employee, message } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.GET_EMPLOYEE_DETAILS_SUCCESS, payload: employee })
        } else if (!success) {
            dispatch({ type: actionTypes.GET_EMPLOYEE_DETAILS_FAILURE, payload: message })
        }

    } catch (error) {
        dispatch({ type: actionTypes.GET_EMPLOYEE_DETAILS_FAILURE, payload: error.message })
    }
}

export const uploadDocuments = (formData) => async (dispatch) => {
    try {
        const response = await fetch('/api/user/upload-document', { method: 'POST', body: formData })
        const { success, message } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.UPLOAD_USER_DOCUEMENTS_SUCCESS, payload: message })
        } else if (!success) {
            dispatch({ type: actionTypes.UPLOAD_USER_DOCUEMENTS_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.UPLOAD_USER_DOCUEMENTS_FAILURE, payload: error })
    }
}