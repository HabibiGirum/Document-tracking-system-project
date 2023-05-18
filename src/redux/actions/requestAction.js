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

export const openFile = (requestId) => {
  return async (dispatch) => {
    dispatch({ type: OPEN_FILE });

    try {
      const response = await axios.get(`/api/requests/${requestId}`, {
        responseType: "arraybuffer",
      });

      const pdfData = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfData);

      console.log(pdfData);
      console.log(response.headers);
      console.log(pdfUrl);

      window.open(pdfUrl);
      dispatch(getRequests());
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearFilters = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_FILTERS });
  };
};
