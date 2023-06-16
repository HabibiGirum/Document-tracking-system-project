import { switchClasses } from "@mui/base";
import axios from "axios";
import { json } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  LOGOUT_USER,
  REQUEST_ERROR,
  CREATE_REQUEST_FAIL,
} from "../constants/requestConstants";

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
        toast.success("Request Created Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        // Handle any additional actions or logic after successful request creation
      })
      .catch((error) => {
        dispatch(createRequestFail(error));
        toast.error("Failed to Create Request!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        // Handle any error actions or logic
      });
  };
};

export const getRequests = () => {
  return async (dispatch, getState) => {
    const { search, searchType, sort, userLogin } = getState();
    const userInfo = userLogin.userInfo;

    let url = `http://localhost:5000/api/requests?DocumentType=${searchType}&sort=${sort}&userInfo=${encodeURIComponent(
      JSON.stringify(userInfo)
    )}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_REQUESTS_BEGIN });

    try {
      console.log(url);
      const response = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
      });

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
      // Dispatch an action to handle the error if necessary
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

export const openFile = (filename, role) => async (dispatch) => {
  try {
    // Make an API call to open the file
    let filenameArr = filename.split(",");
    const college = filenameArr[1].split(" ").join("_");
    const file = filenameArr[0];

    let destinationFolder = "uploads/";
    if (college === "College_of_Electrical_and_Mechanical_Engineering") {
      destinationFolder += "ECE_MECH/";
    } else if (college === "College_of_Applied_Science") {
      destinationFolder += "Applied_Sciences/";
    } else if (college === "College_of_Biological_and_Chemical_Engineering") {
      destinationFolder += "BIO_CHEM/";
    } else if (college === "College_of_Architecture_and_Civil_Engineering") {
      destinationFolder += "ARCH_CIVIL/";
    } else if (college === "College_of_Natural_and_Social_Science") {
      destinationFolder += "NATU_SOCI/";
    }

    if (role === "Human_Resources") {
      destinationFolder += "HR/";
    } else if (role === "Vice President") {
      destinationFolder += "VP/";
    }
    filenameArr[1] = destinationFolder;
    filename = filenameArr.join(",");

    const encodedFilename = encodeURIComponent(filename);
    const response = await axios.get(
      `http://localhost:5000/api/files/${encodedFilename}`,
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
