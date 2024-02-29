import actionTypes from "@/redux/actions/actionTypes";

const initialState = {
    columns: null,
    column: null,
    error: false,
    message: "",
    actionT: ""
}

export const boardReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.CREATE_BOARD_COLUMN_SUCCESS:
            return { ...state, error: false, message: payload, actionT: "create-column" }

        case actionTypes.CREATE_BOARD_COLUMN_FAILURE:
            return { ...state, error: true, message: payload, actionT: "create-column" }

        case actionTypes.GET_BOARD_COLUMN_SUCCESS:
            return { ...state, error: false, message: "", columns: payload, actionT: 'get-columns' }

        case actionTypes.GET_BOARD_COLUMN_FAILURE:
            return { ...state, error: true, message: payload, columns: null, actionT: 'get-columns' }

        case actionTypes.UPDATE_TASK_ORDER_SAME_COLUMN_SUCCESS:
            return { ...state, error: false, message: payload, actionT: 'task-update-in-same-col' }

        case actionTypes.UPDATE_TASK_ORDER_SAME_COLUMN_FAILURE:
            return { ...state, error: true, message: payload, actionT: 'task-update-in-same-col' }

        case actionTypes.UPDATE_TASK_FROM_SOURCE_TO_DESTINATION_SUCCESS:
            return { ...state, error: false, message: payload, actionT: 'different-s-d' }

        case actionTypes.UPDATE_TASK_FROM_SOURCE_TO_DESTINATION_FAILURE:
            return { ...state, error: true, message: payload, actionT: 'different-s-d' }

        default:
            return state
    }
}