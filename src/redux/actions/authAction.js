import actionTypes from "./actionTypes";

export const createAdmin = (data) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.CLEAR_STATE })
        const response = await fetch('/api/admin/create-admin', { method: 'POST', body: JSON.stringify(data) })
        const { success, message } = await response.json();
        if (success) {
            dispatch({ type: actionTypes.CREATE_ADMIN_SUCCESS, payload: message })
        } else if (!success) {
            dispatch({ type: actionTypes.CREATE_ADMIN_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.CREATE_ADMIN_FAILURE, payload: "Something went wrong." })
    }
}

export const loginAdmin = (data) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.CLEAR_STATE })
        const response = await fetch('/api/admin/login', { method: "POST", body: JSON.stringify(data) })
        const { user, success, message } = await response.json();
        if (success && user !== null) {
            dispatch({ type: actionTypes.LOGIN_ADMIN_SUCCESS, payload: message })
        } else if (!success && user === null) {
            dispatch({ type: actionTypes.LOGIN_ADMIN_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.LOGIN_ADMIN_FAILURE })
    }
}

export const logoutAdmin = () => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_STATE })
    try {
        const response = await fetch('/api/admin/logout', { method: 'GET' })
        const { success } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.LOGOUT_ADMIN_SUCCESS })
        }
    } catch (error) {
        dispatch({ type: actionTypes.LOGOUT_ADMIN_FAILURE })
    }
}

export const forgotPassword = (data) => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_STATE })
    try {
        const response = await fetch('/api/admin/forgot-password', { method: 'POST', body: JSON.stringify({ data }) })

        const { success, message } = await response.json()

        if (success) {
            dispatch({ type: actionTypes.FORGOT_PASSWORD_SUCCESS, payload: message })
        } else if (!success) {
            dispatch({ type: actionTypes.FORGOT_PASSWORD_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.FORGOT_PASSWORD_FAILURE, payload: message })
    }
}

export const authenticateUser = (token) => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_STATE })
    try {
        const response = await fetch('/api/admin/get-token-data', { method: 'POST', body: JSON.stringify({ token }) });
        const { success, user, message } = await response.json()
        if (success && user !== null && user !== undefined && user !== "") {
            dispatch({ type: actionTypes.GET_DATA_FROM_TOKEN_SUCCESS, payload: { user, message } })
        } else if (!success && user === null) {
            dispatch({ type: actionTypes.GET_DATA_FROM_TOKEN_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_DATA_FROM_TOKEN_FAILURE })
    }
}

export const handleUserLogin = (data) => async (dispatch) => {
    try {
        const response = await fetch('/api/user/send-otp', { method: "POST", body: JSON.stringify({ data }) })
        const { success, message, email } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.EMPLOYEE_LOGIN_SUCCESS, payload: { message, email } })
        } else if (!success) {
            dispatch({ type: actionTypes.EMPLOYEE_LOGIN_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.EMPLOYEE_LOGIN_FAILURE })
    }
}

export const handleVerifyAndLogin = (data) => async (dispatch) => {
    console.log(data)
    try {
        const response = await fetch('/api/user/verify-otp', { method: "POST", body: JSON.stringify({ data }) })
        const { success, user, message } = await response.json()

        if (user && success) {
            dispatch({ type: actionTypes.EMPLOYEE_VERIFY_LOGIN_SUCCESS, payload: message })
        } else {
            dispatch({ type: actionTypes.EMPLOYEE_VERIFY_LOGIN_FAILURE, payload: message })
        }

    } catch (error) {
        dispatch({ type: actionTypes.EMPLOYEE_VERIFY_LOGIN_FAILURE })
    }
}

export const authenticateEmployee = (token) => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_STATE })
    try {
        const response = await fetch('/api/user/get-token-data', { method: 'POST', body: JSON.stringify({ token }) });
        const { success, user, message } = await response.json()
        if (success && user !== null && user !== undefined && user !== "") {
            dispatch({ type: actionTypes.GET_DATA_FROM_TOKEN_SUCCESS, payload: { user, message } })
        } else if (!success && user === null) {
            dispatch({ type: actionTypes.GET_DATA_FROM_TOKEN_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_DATA_FROM_TOKEN_FAILURE })
    }
}

export const logoutEmployeeUser = () => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_STATE })
    try {
        const response = await fetch('/api/user/logout', { method: 'GET' })
        const { success } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.LOGOUT_EMPLOYEE_USER_SUCCESS })
        }
    } catch (error) {
        dispatch({ type: actionTypes.LOGOUT_EMPLOYEE_USER_FAILURE })
    }
}