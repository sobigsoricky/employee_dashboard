import actionTypes from "../actionTypes";

export const createProject = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_PROJECT_STATE })
  try {
    const response = await fetch("/api/admin/create-project", {
      method: "POST",
      body: JSON.stringify({ data }),
    });
    const { success, message, project } = await response.json();
    if (success) {
      dispatch({ type: actionTypes.CREATE_PROJECT_SUCCESS, payload: { message, project } });
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


export const sendProjectNotification = (data) => async (dispatch) => {
  const response = await fetch('/api/admin/send-project-notification', { method: 'POST', body: JSON.stringify({ data }) })
}

export const handleMarkProject = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_PROJECT_STATE })
  try {
    const response = await fetch('/api/admin/mark-project', { method: "POST", body: JSON.stringify({ id }) })
    const { success, message, markProject } = await response.json()
    if (success) {
      dispatch({ type: actionTypes.MARK_PROJECT_COMPLETE_SUCCESS, payload: { message, markProject } })
    } else if (!success) {
      dispatch({ type: actionTypes.MARK_PROJECT_COMPLETE_FAILURE, payload: message })
    }
  } catch (error) {
    dispatch({ type: actionTypes.MARK_PROJECT_COMPLETE_FAILURE, payload: error.message })
  }
}

export const handleRemoveProject = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_PROJECT_STATE })
  try {
    const response = await fetch('/api/admin/remove-project', { method: 'POST', body: JSON.stringify({ id }) })
    const { message, success, deletedProject } = await response.json()
    if (success) {
      dispatch({ type: actionTypes.REMOVE_PROJECT_SUCCESS, payload: { message, deletedProject } })
    } else if (!success) {
      dispatch({ type: actionTypes.REMOVE_PROJECT_FAILURE, payload: message })
    }
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_PROJECT_FAILURE, payload: error.message })
  }
}