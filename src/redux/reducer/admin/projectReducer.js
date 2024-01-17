import actionTypes from "@/redux/actions/actionTypes";

const initialState = {
    project: null,
    projects: null,
    error: false,
    message: "",
    actionT: ""
}

export const projectReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.CREATE_PROJECT_SUCCESS:
            return { ...state, error: false, message: payload, actionT: 'create' }

        case actionTypes.CREATE_PROJECT_FAILURE:
            return { ...state, error: true, message: payload, actionT: 'create' }

        case actionTypes.GET_ALL_PROJECTS_SUCCESS:
            return { ...state, error: false, projects: payload, actionT: 'fetct-all' }

        case actionTypes.GET_ALL_PROJECTS_FAILURE:
            return { ...state, error: false, projects: null, actionT: "fetch-all" }

        case actionTypes.CLEAR_PROJECT_STATE:
            return { ...state, error: false, message: "", actionT: "", project: null }

        default:
            return state
    }
}