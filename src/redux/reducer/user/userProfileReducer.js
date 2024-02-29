import actionTypes from "@/redux/actions/actionTypes";

const initialState = {
    user: null,
    error: false,
    message: ""
}

export const userProfileReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.GET_EMPLOYEE_DETAILS_SUCCESS:
            return { ...state, user: payload, error: false, message: "success", actionT: "detail" }

        case actionTypes.GET_EMPLOYEE_DETAILS_FAILURE:
            return { ...state, user: null, error: true, message: payload, actionT: "detail" }

        case actionTypes.UPLOAD_USER_DOCUEMENTS_SUCCESS:
            return { ...state, error: false, message: payload, actionT: "upload" }

        case actionTypes.UPLOAD_USER_DOCUEMENTS_FAILURE:
            return { ...state, error: true, message: payload, actionT: "upload" }

        default:
            return state
    }
}