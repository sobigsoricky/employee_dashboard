import actionTypes from "../actionTypes";

export const createTeam = (data) => async (dispatch) => {
    try {
        const response = await fetch('/api/admin/create-team', { method: "POST", body: JSON.stringify({ data }) })
        const { success, message } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.CREATE_TEAM_SUCCESS, payload: message })
        } else if (!success) {
            dispatch({ type: actionTypes.CREATE_TEAM_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.CREATE_TEAM_FAILURE, payload: error.message })
    }
}

export const getTeams = () => async (dispatch) => {
    try {
        const response = await fetch('/api/admin/get-teams')
        const { success, message, teams } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.GET_TEAMS_SUCCESS, payload: teams })
        } else if (!success) {
            dispatch({ type: actionTypes.GET_TEAMS_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_TEAMS_FAILURE, payload: error.message })
    }
}