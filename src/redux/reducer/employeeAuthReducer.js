import actionTypes from "../actions/actionTypes";

const initialState = {
    userInfo: null,
    error: false,
    loggedUser: "",
    message: "",
    action: "",
}

export const employeeAuthReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.EMPLOYEE_LOGIN_SUCCESS:
            return { ...state, error: false, message: payload.message, loggedUser: payload.email, actionT: "user-login" }

        case actionTypes.EMPLOYEE_LOGIN_FAILURE:
            return { ...state, error: true, message: payload, loggedUser: "", actionT: "user-login" }

        case actionTypes.EMPLOYEE_VERIFY_LOGIN_SUCCESS:
            return { ...state, error: false, message: payload, actionT: 'otp-v' }

        case actionTypes.EMPLOYEE_VERIFY_LOGIN_FAILURE:
            return { ...state, error: true, message: payload, actionT: 'otp-v' }

        case actionTypes.GET_DATA_FROM_TOKEN_SUCCESS:
            return { ...state, error: false, userInfo: payload.user, message: payload.message, actionT: "auth" }

        case actionTypes.GET_DATA_FROM_TOKEN_FAILURE:
            return { ...state, error: true, userInfo: null, message: payload, actionT: "auth" }

        case actionTypes.LOGOUT_EMPLOYEE_USER_SUCCESS:
            return { ...state, error: false, message: "Logout successful" }

        case actionTypes.LOGOUT_EMPLOYEE_USER_FAILURE:
            return { ...state, error: true, message: "Logout failed" }

        default:
            return state
    }
}