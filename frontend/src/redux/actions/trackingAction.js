import {
  FETCH_SENT_DOCUMENTS_FAILURE,
  FETCH_SENT_DOCUMENTS_REQUEST,
  FETCH_SENT_DOCUMENTS_SUCCESS,
} from "../constants/trackingConstants";
import {
  ADD_DOCUMENT_REQUEST,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAILURE,
  UPDATE_TRACKING_DEPARTMENT,
  SEND_REJECTION_MESSAGE,
  SEND_ACCEPTANCE_MESSAGE,
} from "../constants/trackingConstants";
import axios from "axios";

export const addDocumentRequest = () => {
  return {
    type: ADD_DOCUMENT_REQUEST,
  };
};

export const addDocumentSuccess = (document) => {
  return {
    type: ADD_DOCUMENT_SUCCESS,
    payload: document,
  };
};

export const addDocumentFailure = (error) => {
  return {
    type: ADD_DOCUMENT_FAILURE,
    payload: error,
  };
};



// Action to send acceptance message and update tracking
export const sendAcceptanceMessage =
  (userData, messageId) => async (dispatch) => {
    try {
      // Determine the recipient role and update the corresponding tracking field to true
      // let recipient = "";
      // if (userData.userRole === "Department Head") {
      //   recipient = "College Dean";
      // } else if (userData.userRole === "College Dean") {
      //   recipient = "Vice President";
      // } else if (userData.userRole === "Vice President") {
      //   recipient = "Human Resources";
      // }

      // Make the API call to update the corresponding role in the remote MongoDB
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        role: userData.role,
        id: userData.id,// Add the received message ID to the request body
      };

      const response = await axios.post(
        "http://localhost:5000/api/tracking/updateRole",
        body,
        config
      );

      // Dispatch the action to update tracking in the Redux state
      dispatch({
        type: SEND_ACCEPTANCE_MESSAGE,
        payload: {
          role: userData.role,
          message:response.data.message
          // additional data from the response if needed
        },
      });

      console.log(response.data); // Access the response data if needed
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };


export const addDocument = (documentData, buttonPressed, userRole) => {
  return async (dispatch) => {
    dispatch(addDocumentRequest());

    try {
      const data = {
        specificId: documentData,
      };

      const response = await axios.post(
        "http://localhost:5000/api/tracking",
        data
      );

      const document = response.data;

      dispatch(addDocumentSuccess(document));

      if (userRole === "Lecturer") {
        // Skip any further actions for lecturers
        return;
      }

      if (buttonPressed === "accept") {
        dispatch({ type: UPDATE_TRACKING_DEPARTMENT });

        if (userRole === "Electrical And Mechanical College Dean") {
          // Send acceptance message to the Vice President
          dispatch({ type: SEND_ACCEPTANCE_MESSAGE });
        } else if (userRole === "Biological And Chemical College Dean") {
          // Send acceptance message to the Vice President
          dispatch({ type: SEND_ACCEPTANCE_MESSAGE });
        } else if (userRole === "Natural And Social College Dean") {
          // Send acceptance message to the Vice President
          dispatch({ type: SEND_ACCEPTANCE_MESSAGE });
        } else if (userRole === "Architecture And Civil College Dean") {
          // Send acceptance message to the Vice President
          dispatch({ type: SEND_ACCEPTANCE_MESSAGE });
        } else if (userRole === "Applied College Dean") {
          // Send acceptance message to the Vice President
          dispatch({ type: SEND_ACCEPTANCE_MESSAGE });
        } else if (userRole === "Department Head") {
          // Send acceptance message to the College Dean
          dispatch({ type: SEND_ACCEPTANCE_MESSAGE });
        } else if (userRole === "Vice President") {
          // Send acceptance message to the Human Resources
          dispatch({ type: SEND_ACCEPTANCE_MESSAGE });
        } else if (userRole === "Human Resources") {
          // Do something else for Human Resources
        }
      } else if (buttonPressed === "reject") {
        if (userRole === "Department Head") {
          // Send rejection message to the user who sent the message
          dispatch({ type: SEND_REJECTION_MESSAGE });
        } else if (userRole === "College Dean") {
          // Send rejection message to the Department Head
          dispatch({ type: SEND_REJECTION_MESSAGE });
        } else if (userRole === "Vice President") {
          // Send rejection message to the College Dean
          dispatch({ type: SEND_REJECTION_MESSAGE });
        } else if (userRole === "Human Resources") {
          // Send rejection message to the Vice President
          dispatch({ type: SEND_REJECTION_MESSAGE });
        }
      }
    } catch (error) {
      console.error("Error adding document:", error);
      dispatch(addDocumentFailure(error.message));
    }
  };
};

export const fetchSentDocuments = (fullName, documentType, status) => {
  return async (dispatch) => {
    dispatch(fetchSentDocumentsRequest());

    try {
      const response = await axios.get(`http://localhost:5000/api/sent`, {
        params: {
          fullName,
          documentType,
          status,
        },
      });

      const documents = response.data.documents;
      const documentIds = documents.map((document) => document.id);

      const statusResponses = await Promise.all(
        documentIds.map((documentId) =>
          axios.get(`http://localhost:5000/api/tracking/${documentId}`)
        )
      );

      const documentsWithStatus = documents.map((document, index) => {
        const trackingInfo = statusResponses[index].data;
        const { department, college, vicepresident, humanResource } =
          trackingInfo;

        return {
          ...document,
          status: {
            department,
            college,
            vicepresident,
            humanResource,
          },
        };
      });

      dispatch(fetchSentDocumentsSuccess(documentsWithStatus));
    } catch (error) {
      console.error("Error fetching sent documents:", error);
      dispatch(fetchSentDocumentsFailure(error.message));
    }
  };
};

export const fetchSentDocumentsRequest = () => {
  return {
    type: FETCH_SENT_DOCUMENTS_REQUEST,
  };
};

export const fetchSentDocumentsSuccess = (documents) => {
  return {
    type: FETCH_SENT_DOCUMENTS_SUCCESS,
    payload: documents,
  };
};

export const fetchSentDocumentsFailure = (error) => {
  return {
    type: FETCH_SENT_DOCUMENTS_FAILURE,
    payload: error,
  };
};
