import actionTypes from "../actionTypes";

export const createProject = (data) => async (dispatch) => {
  try {
    const response = await fetch("/api/admin/create-project", {
      method: "POST",
      body: JSON.stringify({ data }),
    });
    const { success, message } = await response.json();
    if (success) {
      dispatch({ type: actionTypes.CREATE_PROJECT_SUCCESS, payload: message });
    } else if (!success) {
      dispatch({ type: actionTypes.CREATE_PROJECT_FAILURE, payload: message });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_PROJECT_FAILURE,
      payload: error.message,
    });
  }
};

export const getAllProjects = () => async (dispatch) => {
  try {
    const response = await fetch("/api/admin/get-projects");
    let { success, message, projects } = await response.json();
    projects = projects.map((project) => {
      project.phases = project.phases.map((phase) => phase[0]);
      return project;
    });
    if (success) {
      dispatch({
        type: actionTypes.GET_ALL_PROJECTS_SUCCESS,
        payload: projects,
      });
    } else if (!success) {
      dispatch({
        type: actionTypes.GET_ALL_PROJECTS_FAILURE,
        payload: message,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_PROJECTS_FAILURE,
      payload: error.message,
    });
  }
};

export const clearProjectState = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_PROJECT_STATE });
};
