import actionTypes from "@/redux/actions/actionTypes";

const initialState = {
    employee: null,
    employees: null,
    message: "",
    actionT: "",
    error: false
}

export const adminEmployeeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.CREATE_EMPLOYEE_SUCCESS:
            return { ...state, message: payload, error: false, actionT: 'create' }

        case actionTypes.CREATE_EMPLOYEE_FAILURE:
            return { ...state, message: payload, error: true, actionT: 'create' }

        case actionTypes.GET_EMPLOYEE_LIST_SUCCESS:
            return { ...state, employees: payload, error: false, actionT: "fetch" }

        case actionTypes.GET_EMPLOYEE_LIST_FAILURE:
            return { ...state, message: payload, error: true, actionT: "fetch" }

        case actionTypes.GET_EMPLOYEE_DETAILS_SUCCESS:
            return { ...state, employee: payload, error: false, actionT: "fetchEmp" }

        case actionTypes.GET_EMPLOYEE_DETAILS_FAILURE:
            return { ...state, employee: null, message: payload, error: true, actionT: "fetchEmp" }

        case actionTypes.REMOVE_EMPLOYEE_SUCCESS:
            return { ...state, message: payload, error: false, actionT: "remove" }

        case actionTypes.REMOVE_EMPLOYEE_FAILURE:
            return { ...state, message: payload, error: true, actionT: "remove" }

        case actionTypes.CLEAR_EMPLOYEE_STATE:
            return { ...state, employee: null, message: "", error: false, actionT: "" }

        default:
            return state
    }
}