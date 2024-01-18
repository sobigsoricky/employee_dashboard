import actionTypes from "../actionTypes";

export const createEmployeeProfile = (formData) => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_EMPLOYEE_STATE })
    try {
        const response = await fetch('/api/admin/create-employee-profile', {
            method: 'POST',
            body: formData,
        });

        const { message, success } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.CREATE_EMPLOYEE_SUCCESS, payload: message });
        } else if (!success) {
            dispatch({ type: actionTypes.CREATE_EMPLOYEE_FAILURE, payload: message });
        }
    } catch (error) {
        dispatch({ type: actionTypes.CREATE_EMPLOYEE_FAILURE, payload: error.message });
    }
};

export const getAllEmployees = () => async (dispatch) => {
    try {
        const response = await fetch('/api/admin/get-all-employees');
        const { success, data, message } = await response.json();
        if (success) {
            dispatch({ type: actionTypes.GET_EMPLOYEE_LIST_SUCCESS, payload: data })
        } else if (!success) {
            dispatch({ type: actionTypes.GET_EMPLOYEE_LIST_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_DATA_FROM_TOKEN_FAILURE, payload: error.message })
    }
}

export const getEmployeeDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.CLEAR_EMPLOYEE_STATE })
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

export const removeEmployee = (id) => async (dispatch) => {
    try {
        const response = await fetch('/api/admin/remove-employee', { method: 'POST', body: JSON.stringify({ id }) })
        const { success, message } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.REMOVE_EMPLOYEE_SUCCESS, payload: message })
        } else if (!success) {
            dispatch({ type: actionTypes.REMOVE_EMPLOYEE_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.REMOVE_EMPLOYEE_FAILURE, payload: error.message })
    }
}