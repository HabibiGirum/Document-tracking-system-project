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

const initialState = {
  isLoading: false,
  requests: [],
  totalRequests: 0,
  numOfPages: 0,
  editRequestId: null,
  error: null,
};

const requestReducer = (state = initialState, action) => {
  console.log(state)
  switch (action.type) {
    case CREATE_REQUEST_BEGIN:
    case GET_REQUESTS_BEGIN:
    case DELETE_REQUEST_BEGIN:
    case EDIT_REQUEST_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_REQUEST_SUCCESS:
    case GET_REQUESTS_SUCCESS:
    case EDIT_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        requests: action.payload.requests,
        totalRequests: action.payload.totalRequests,
        numOfPages: action.payload.numOfPages,
      };
    case CREATE_REQUEST_ERROR:
    case EDIT_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.msg,
      };
    case SET_EDIT_REQUEST:
      return {
        ...state,
        editRequestId: action.payload.id,
      };
    case OPEN_FILE:
    case CLEAR_FILTERS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default requestReducer;
