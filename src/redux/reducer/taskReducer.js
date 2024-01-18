import actionTypes from "../actions/actionTypes";

const initialState = {
    task: null,
    tasks: null,
    error: false,
    message: "",
    actionT: "",
    savedTask: null,
    completedTask: null
}

export const taskReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.CREATE_TASK_SUCCESS:
            return { ...state, message: payload.message, error: false, actionT: "create", savedTask: payload.task }

        case actionTypes.CREATE_TASK_FAILURE:
            return { ...state, message: payload, error: true, actionT: "create" }

        case actionTypes.GET_TASKS_SUCCESS:
            return { ...state, tasks: payload, error: false, actionT: "fetch-tasks" }

        case actionTypes.GET_TASKS_FAILURE:
            return { ...state, tasks: null, error: true, actionT: "fetch-tasks" }

        case actionTypes.MARK_TASK_COMPLETE_SUCCESS:
            return { ...state, error: false, message: payload.message, actionT: "mark", completedTask: payload.task }

        case actionTypes.MARK_TASK_COMPLETE_SUCCESS:
            return { ...state, error: true, message: payload, actionT: "mark", completedTask: null }

        case actionTypes.DELETE_TASK_SUCCESS:
            return { ...state, error: false, message: payload, actionT: "delete" }

        case actionTypes.DELETE_TASK_FAILURE:
            return { ...state, error: true, message: payload, actionT: "delete" }

        case actionTypes.CLEAR_TASK_STATE:
            return { ...state, error: false, message: "", actionT: "", savedTask: null, completedTask: null }

        default:
            return state
    }
}