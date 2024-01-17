import actionTypes from "../actions/actionTypes";

const initialState = {
    userInfo: null,
    error: false,
    message: "",
    actionT: "",
    loggedUser: ""
}

export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.CREATE_ADMIN_SUCCESS:
            return { ...state, error: false, message: payload, actionT: "create" }

        case actionTypes.CREATE_ADMIN_FAILURE:
            return { ...state, error: true, message: payload, actionT: "create" }

        case actionTypes.LOGIN_ADMIN_SUCCESS:
            return { ...state, error: false, message: payload, actionT: "login" }

        case actionTypes.LOGIN_ADMIN_FAILURE:
            return { ...state, error: true, message: payload, actionT: "login" }

        case actionTypes.LOGOUT_ADMIN_SUCCESS:
            return { ...state, error: false, message: "logout successful" }

        case actionTypes.LOGOUT_ADMIN_FAILURE:
            return { ...state, error: true, message: "logout failed" }

        case actionTypes.FORGOT_PASSWORD_SUCCESS:
            return { ...state, error: false, message: payload, actionT: 'forgot' }

        case actionTypes.FORGOT_PASSWORD_FAILURE:
            return { ...state, error: true, message: payload, actionT: 'forgot' }

        case actionTypes.GET_DATA_FROM_TOKEN_SUCCESS:
            return { ...state, error: false, userInfo: payload.user, message: payload.message, actionT: "auth" }

        case actionTypes.GET_DATA_FROM_TOKEN_FAILURE:
            return { ...state, error: true, userInfo: null, message: payload, actionT: "auth" }

        case actionTypes.CLEAR_STATE:
            return { ...state, error: false, userInfo: null, message: "", actionT: "", loggedUser: "" }

        default:
            return state
    }
}