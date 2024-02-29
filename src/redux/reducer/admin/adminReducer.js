import actionTypes from "@/redux/actions/actionTypes";

const initialState = {
    admins: null,
    error: false,
    message: ""
}

export const adminReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.GET_ADMINS_SUCCESS:
            return { ...state, admins: payload, error: false }

        case actionTypes.GET_ADMINS_FAILURE:
            return { ...state, admins: null, error: true }

        default:
            return state
    }
}