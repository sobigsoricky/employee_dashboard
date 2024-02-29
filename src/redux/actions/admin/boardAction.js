import actionTypes from "../actionTypes";

export const addBoardColumn = (data) => async (dispatch) => {
    try {
        const response = await fetch('/api/admin/create-board-column', { method: 'POST', body: JSON.stringify({ data }) });
        const { success, message } = await response.json();
        if (success) {
            dispatch({ type: actionTypes.CREATE_BOARD_COLUMN_SUCCESS, payload: message })
        } else if (!success) {
            dispatch({ type: actionTypes.CREATE_BOARD_COLUMN_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.CREATE_BOARD_COLUMN_FAILURE, payload: error })
    }
}

export const getBoardColumns = () => async (dispatch) => {
    try {
        const response = await fetch('/api/admin/get-board-columns')
        const { success, message, columns } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.GET_BOARD_COLUMN_SUCCESS, payload: columns })
        } else if (!success) {
            dispatch({ type: actionTypes.GET_BOARD_COLUMN_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_BOARD_COLUMN_FAILURE, payload: error })
    }
}

export const handleUpdateTaskOrderSameColumn = (updatedColumns) => async (dispatch) => {
    try {
        const response = await fetch('/api/admin/update-task-order-same-column', { method: "POST", body: JSON.stringify({ updatedColumns }) })
        const { success, message } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.UPDATE_TASK_ORDER_SAME_COLUMN_SUCCESS, payload: message })
        } else if (!success) {
            dispatch({ type: actionTypes.UPDATE_TASK_ORDER_SAME_COLUMN_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.UPDATE_TASK_ORDER_SAME_COLUMN_FAILURE, payload: error })
    }
}

export const handleMoveTaskFromSourceToAnotherDestination = (updatedColumns) => async (dispatch) => {
    try {
        const response = await fetch('/api/admin/move-task-different-source-different-destination', { method: 'POST', body: JSON.stringify({ updatedColumns }) })
        const { success, message } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.UPDATE_TASK_FROM_SOURCE_TO_DESTINATION_SUCCESS, payload: message })
        } else if (!success) {
            dispatch({ type: actionTypes.UPDATE_TASK_FROM_SOURCE_TO_DESTINATION_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.UPDATE_TASK_FROM_SOURCE_TO_DESTINATION_FAILURE, payload: error })
    }
}