import axios from "axios";
import {
  CREATE_REQUEST_BEGIN,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_ERROR,
  GET_REQUESTS_BEGIN,
  GET_REQUESTS_SUCCESS,
  SET_EDIT_REQUEST,
  DELETE_REQUEST_BEGIN,
  EDIT_REQUEST_BEGIN,
  EDIT_REQUEST_ERROR,
  EDIT_REQUEST_SUCCESS,
  OPEN_FILE,
  CLEAR_FILTERS,
  CLEAR_VALUES,
  CLEAR_ALERT,
  LOGOUT_USER,
  REQUEST_ERROR
} from "../constants/requestConstants";

export const clearAlert = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
};

const addUserToLocalStorage = ({ user, token, department }) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
  localStorage.setItem("department", department);
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("department");
};

export const createRequest = () => {
  return async (dispatch, getState) => {
    const { user } = getState();
    const { DocumentType, To, purpose, file } = getState();

    dispatch({ type: CREATE_REQUEST_BEGIN });

    try {
      await axios.post("/api/requests", {
        DocumentType,
        To,
        purpose,
        file,
      });

      dispatch({ type: CREATE_REQUEST_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;

      dispatch({
        type: CREATE_REQUEST_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    dispatch(clearAlert());
  };
};

export const getRequests = () => {
  return async (dispatch, getState) => {
    const { search, searchType, sort } = getState();
    let url = `http://localhost:5000/api/requests?DocumentType=${searchType}&sort=${sort}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_REQUESTS_BEGIN });

    try {
      const response = await axios.get(url);
      console.log(response,"response")
      // const { response.data, totalRequests, numOfPages } = response;
      // console.log(requests)
      const totalRequests = 5
      const numOfPages = 3  


      dispatch({
        type: GET_REQUESTS_SUCCESS,
        payload: {
          requests: response.data,
          totalRequests,
          numOfPages,
        },
      });
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };
};

export const setEditRequest = (id) => {
  return (dispatch) => {
    dispatch({ type: SET_EDIT_REQUEST, payload: { id } });
  };
};

export const editRequest = () => {
  return async (dispatch, getState) => {
    const { DocumentType, To, purpose, file } = getState().state;

    dispatch({ type: EDIT_REQUEST_BEGIN });

    try {
      await axios.patch(`/api/requests/${getState().state.editRequestId}`, {
        DocumentType,
        purpose,
        To,
        file,
      });

      dispatch({ type: EDIT_REQUEST_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;

      dispatch({
        type: EDIT_REQUEST_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    dispatch(clearAlert());
  };
};

export const deleteRequest = (requestId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_REQUEST_BEGIN });
    console.log(`req id ${requestId}`);

    try {
      await axios.delete(`/api/requests/${requestId}`);
      dispatch(getRequests());
    } catch (error) {
      logoutUser()(dispatch);
    }

    console.log(`delete request: ${requestId}`);
  };
};

export const openFile = (filename) => async (dispatch) => {
  try {
    // Make an API call to open the file
    const response = await axios.get(
      `http://localhost:5000/api/files/${filename}`,
      {
        responseType: "blob",
      }
    );

    // Create a blob URL for the file
    const fileBlob = new Blob([response.data], { type: "application/pdf" });
    const fileUrl = URL.createObjectURL(fileBlob);

    // Open the file in a new tab/window
    window.open(fileUrl);
  } catch (error) {
    // Handle error
    dispatch({
      type: REQUEST_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const clearFilters = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_FILTERS });
  };
};
