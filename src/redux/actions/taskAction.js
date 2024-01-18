import actionTypes from "./actionTypes";

export const getTasks = (id) => async (dispatch) => {
    try {
        const response = await fetch('/api/get-tasks')
        const { success, tasks, message } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.GET_TASKS_SUCCESS, payload: tasks })
        } else if (!success) {
            dispatch({ type: actionTypes.GET_TASKS_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_TEAMS_FAILURE, payload: error })
    }
}

export const createTask = (formData) => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_TASK_STATE })
    try {
        const response = await fetch('/api/crate-task', { method: "POST", body: formData })
        const { success, message, task } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.CREATE_TASK_SUCCESS, payload: { message, task } })
        } else if (!success) {
            dispatch({ type: actionTypes.CREATE_TASK_FAILURE, payload: message })
        }

    } catch (error) {
        dispatch({ type: actionTypes.CREATE_TASK_FAILURE, payload: error.mesasage })
    }
}

export const sendTaskNotification = (data) => async (dispatch) => {
    const response = await fetch('/api/send-task-notification', { method: 'POST', body: JSON.stringify({ data }) })
}

export const handleTaskMarkComplete = (t) => async (dispatch) => {
    try {
        const response = await fetch('/api/mark-task', { method: "POST", body: JSON.stringify({ t }) })
        const { success, message, task } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.MARK_TASK_COMPLETE_SUCCESS, payload: { message, task } })
        } else if (!success) {
            dispatch({ type: actionTypes.MARK_TASK_COMPLETE_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.MARK_TASK_COMPLETE_FAILURE, payload: error.message })
    }
}

export const handleTaskDeletion = (id) => async (dispatch) => {
    try {
        const response = await fetch('/api/delete-task', { method: 'POST', body: JSON.stringify({ id }) })
        const { success, message } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.DELETE_TASK_SUCCESS, payload: message })
        } else if (!success) {
            dispatch({ type: actionTypes.DELETE_TASK_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.DELETE_TASK_FAILURE, payload: error.message })
    }
}