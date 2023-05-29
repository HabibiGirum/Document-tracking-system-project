import {
  FETCH_SENT_DOCUMENTS_REQUEST,
  FETCH_SENT_DOCUMENTS_SUCCESS,
  FETCH_SENT_DOCUMENTS_FAILURE,
} from "../constants/trackingConstants";

const initialState = {
  documents: [],
  loading: false,
  error: null,
};

const sentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SENT_DOCUMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SENT_DOCUMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        documents: action.payload,
      };
    case FETCH_SENT_DOCUMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default sentReducer;
