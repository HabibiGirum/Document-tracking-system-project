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
} from "../constants/requestConstants";


export const createRequest = () => async (dispatch, getState) => {
  dispatch({ type: CREATE_REQUEST_BEGIN });
  const { user } = getState();
  const { DocumentType, To, purpose, file } = getState().state;
  try {
    await authFetch.post("/requests", {
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
  clearAlert();
};

export const getRequests = () => async (dispatch, getState) => {
  const { search, searchType, sort } = getState().state;
  let url = `/requests?DocumentType=${searchType}&sort=${sort}`;

  if (search) {
    url = url + `&search=${search}`;
  }

  dispatch({ type: GET_REQUESTS_BEGIN });
  try {
    const { data } = await authFetch(url);
    const { requests, totalRequests, numOfPages } = data;
    dispatch({
      type: GET_REQUESTS_SUCCESS,
      payload: {
        requests,
        totalRequests,
        numOfPages,
      },
    });
  } catch (error) {
    console.log(error.response);
  }
  clearAlert();
};

export const setEditRequest = (id) => (dispatch) => {
  dispatch({ type: SET_EDIT_REQUEST, payload: { id } });
};

export const editRequest = () => async (dispatch, getState) => {
  dispatch({ type: EDIT_REQUEST_BEGIN });
  const { DocumentType, To, purpose, file } = getState().state;
  try {
    await authFetch.patch(`/requests/${getState().state.editRequestId}`, {
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
  clearAlert();
};

export const deleteRequest = (requestId) => async (dispatch) => {
  dispatch({ type: DELETE_REQUEST_BEGIN });
  console.log(`req id ${requestId}`);
  try {
    await authFetch.delete(`/requests/${requestId}`);
    dispatch(getRequests()); // dispatch getRequests() to update the state with the new list of requests after deleting the request
  } catch (error) {
    logoutUser();
  }
  console.log(`delete request : ${requestId}`);
};

export const openFile = (requestId) => async (dispatch) => {
  dispatch({ type: OPEN_FILE });
  try {
    const response = await authFetch(`/requests/${requestId}`, {
      responseType: "arraybuffer", // specify response type as arraybuffer to handle binary data
    });
    const pdfData = new Blob([response.data], { type: "application/pdf" }); // create Blob object from response data
    const pdfUrl = URL.createObjectURL(pdfData); // create URL for Blob object
    console.log(pdfData);
    console.log(response.headers);
    console.log(pdfUrl);
    window.open(pdfUrl); // open new window/tab with URL of Blob object
    dispatch(getRequests()); // dispatch getRequests() to update the state with the new list of requests after opening the file
  } catch (error) {
    console.log(error);
  }
};

export const clearFilters = () => (dispatch) => {
  dispatch({ type: CLEAR_FILTERS });
};