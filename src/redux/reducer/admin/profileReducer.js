import actionTypes from "@/redux/actions/actionTypes";

const initialState = {
    error: false,
    message: "",
    actionT: ""
}

export const profileReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.CREATE_ADMIN_PROFILE_SUCCESS:
            return { ...state, error: false, message: payload, actionT: "create" }

        case actionTypes.CREATE_ADMIN_PROFILE_FAILURE:
            return { ...state, error: true, message: payload, actionT: "create" }

        case actionTypes.CLEAR_STATE:
            return { ...state, error: false, message: "", actionT: "" }

        default:
            return state
    }
}