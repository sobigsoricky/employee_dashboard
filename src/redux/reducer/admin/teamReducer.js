import actionTypes from "@/redux/actions/actionTypes";

const initialState = {
    teams: null,
    team: null,
    message: "",
    error: false,
    actionT: "",
    savedTeam: null,
}

export const teamReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.CREATE_TEAM_SUCCESS:
            return { ...state, message: payload.message, error: false, actionT: "create", savedTeam: payload.team }

        case actionTypes.CREATE_TEAM_FAILURE:
            return { ...state, message: payload, error: true, actionT: "create", savedTeam: null }

        case actionTypes.GET_TEAMS_SUCCESS:
            return { ...state, teams: payload, error: false, actionT: 'fetch' }

        case actionTypes.GET_TEAMS_FAILURE:
            return { ...state, message: payload, error: true, actionT: 'fetch' }

        case actionTypes.GET_TEAM_SUCCESS:
            return { ...state, message: payload.message, team: payload.team, error: false, actionT: 'fetch-team' }

        case actionTypes.GET_TEAM_FAILURE:
            return { ...state, message: payload, team: null, error: true, actionT: 'fetch-team' }

        default:
            return state
    }
}