import actionTypes from "@/redux/actions/actionTypes";

const initialState = {
    teams: null,
    team: null,
    message: "",
    error: false,
    actionT: ""
}

export const teamReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.CREATE_TEAM_SUCCESS:
            return { ...state, message: payload, error: false, actionT: "create" }

        case actionTypes.CREATE_TEAM_FAILURE:
            return { ...state, message: payload, error: true, actionT: "create" }

        case actionTypes.GET_TEAMS_SUCCESS:
            return { ...state, teams: payload, error: false, actionT: 'fetch' }

        case actionTypes.GET_TEAMS_FAILURE:
            return { ...state, message: payload, error: true, actionT: 'fetch' }

        default:
            return state
    }
}