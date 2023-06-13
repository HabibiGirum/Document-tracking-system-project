import {
  ADD_DOCUMENT_REQUEST,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAILURE,
  FETCH_SENT_DOCUMENTS_REQUEST,
  FETCH_SENT_DOCUMENTS_SUCCESS,
  FETCH_SENT_DOCUMENTS_FAILURE,
  UPDATE_TRACKING_DEPARTMENT,
  SEND_REJECTION_MESSAGE,
  SEND_ACCEPTANCE_MESSAGE,
} from "../constants/trackingConstants";

const initialState = {
  sentDocuments: [],
  loading: false,
  error: null,
  department: false,
  collegeDean: false,
  vicePresident: false,
  humanResources: false,
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

    case UPDATE_TRACKING_DEPARTMENT:
      return {
        ...state,
        department: true,
      };

    case SEND_REJECTION_MESSAGE:
      let recipientRejection = "";

      if (action.payload.userRole === "Department Head") {
        recipientRejection = "User";
      } else if (action.payload.userRole === "College Dean") {
        recipientRejection = "Department Head";
      } else if (action.payload.userRole === "Vice President") {
        recipientRejection = "College Dean";
      } else if (action.payload.userRole === "Human Resources") {
        recipientRejection = "Vice President";
      }

      // Code to send rejection message to the appropriate recipient based on user role
      // Update the respective tracking field to true
      // Store the message in the respective database
      return {
        ...state,
        [recipientRejection]: true,
      };

    case SEND_ACCEPTANCE_MESSAGE:
      let recipientAcceptance = "";

      if (action.payload.userRole === "Department Head") {
        recipientAcceptance = "College Dean";
      } else if (action.payload.userRole === "College Dean") {
        recipientAcceptance = "Vice President";
      } else if (action.payload.userRole === "Vice President") {
        recipientAcceptance = "Human Resources";
      }

      // Code to send acceptance message to the appropriate recipient based on user role
      // Update the respective tracking field to true
      // Store the message in the respective database
      return {
        ...state,
        [recipientAcceptance]: true,
      };

    default:
      return state;
  }
};

export default trackingReducer;
