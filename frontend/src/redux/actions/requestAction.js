import axios from "axios";
import { API_BASE_URL } from "../../config";

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
  REQUEST_ERROR,
  CREATE_REQUEST_FAIL,
  
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
  localStorage.setItem("userInfo", JSON.stringify(user));
  localStorage.setItem("token", token);
  localStorage.setItem("department", department);
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("department");
};

export const createRequestBegin = () => ({
  type: CREATE_REQUEST_BEGIN,
});

export const createRequestSuccess = () => ({
  type: CREATE_REQUEST_SUCCESS,
});

export const createRequestFail = (error) => ({
  type: CREATE_REQUEST_FAIL,
  payload: error,
});

export const createRequestError = (error) => ({
  type: CREATE_REQUEST_ERROR,
  payload: error,
});

export const createRequest = (requestData) => {
  return (dispatch) => {
    dispatch(createRequestBegin());
    console.log(requestData);
    axios
      .post(`${API_BASE_URL}/requests`, requestData)
      .then((response) => {
        dispatch(createRequestSuccess());
        // Handle any additional actions or logic after successful request creation
      })
      .catch((error) => {
        dispatch(createRequestFail(error));
        // Handle any error actions or logic
      });
  };
};

export const getRequests = () => {
  return async (dispatch, getState) => {
    const { search, searchType, sort, userLogin } = getState();
    const userInfo = JSON.parse(userLogin.userInfo);
    const role = userInfo.role;
    const college = userInfo.college;
    const email = userInfo.to;
    console.log(userInfo);
    let url = "";
    if (role === "1") {
      switch (college) {
        case "1":
          // code block
          url = `http://localhost:5000/api/requests?DocumentType=${searchType}&sort=${sort}&userInfo=${encodeURIComponent(
            JSON.stringify(userInfo)
          )}`;
          break;
        case "2":
          // code block
          url = `http://localhost:5000/api/biological_chemical?DocumentType=${searchType}&sort=${sort}`;
          break;
        case "3":
          // code block
          url = `http://localhost:5000/api/apllied?DocumentType=${searchType}&sort=${sort}`;
          break;
        case "4":
          // code block
          url = `http://localhost:5000/api/natural_social?DocumentType=${searchType}&sort=${sort}`;
          break;
        case "5":
          url = `http://localhost:5000/api/architecture_civil?DocumentType=${searchType}&sort=${sort}`;
          break;
        default:
        // code block
      }
    }

    if (search) {
      url = url + `&search=${search}`;
    }
    console.log(url);
    dispatch({ type: GET_REQUESTS_BEGIN });

    try {
      const response = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(userInfo),
      });
      console.log(response);
      console.log(response, "response");
      // const { response.data, totalRequests, numOfPages } = response;
      // console.log(requests)
      const totalRequests = 5;
      const numOfPages = 3;

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

