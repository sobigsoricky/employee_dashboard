import actionTypes from "@/redux/actions/actionTypes";

const initialState = {
    reports: null,
    error: false,
    message: "",
    actionT: ""
}

export const reportReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SAVE_WORK_UPDATE_SUCCESS:
            return { ...state, error: false, message: payload, actionT: "send" }

        case actionTypes.SAVE_WORK_UPDATE_FAILURE:
            return { ...state, error: true, message: payload, actionT: "send" }

        case actionTypes.GET_WORK_UPDATE_SUCCESS:
            return { ...state, error: false, message: "", reports: payload, action: "get-reports" }

        case actionTypes.GET_WORK_UPDATE_FAILURE:
            return { ...state, error: false, message: payload, action: "get-reports" }

        case actionTypes.GET_WORK_UPDATE_FAILURE:
            return { ...state, error: true, message: payload, action: "get-reports" }

        default:
            return state;
    }
}