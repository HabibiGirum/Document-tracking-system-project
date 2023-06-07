import {
  ADD_DOCUMENT_REQUEST,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAILURE,
  FETCH_SENT_DOCUMENTS_REQUEST,
  FETCH_SENT_DOCUMENTS_SUCCESS,
  FETCH_SENT_DOCUMENTS_FAILURE,
} from "../constants/trackingConstants";

const initialState = {
  sentDocuments: [],
  loading: false,
  error: null,
};

const trackingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DOCUMENT_REQUEST:
    case FETCH_SENT_DOCUMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADD_DOCUMENT_SUCCESS:
      return {
        ...state,
        sentDocuments: [...state.sentDocuments, action.payload],
        loading: false,
      };

    case FETCH_SENT_DOCUMENTS_SUCCESS:
      return {
        ...state,
        sentDocuments: action.payload,
        loading: false,
      };

    case ADD_DOCUMENT_FAILURE:
    case FETCH_SENT_DOCUMENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default trackingReducer;
