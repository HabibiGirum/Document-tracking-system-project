import {
  FETCH_SENT_DOCUMENTS_FAILURE,
  FETCH_SENT_DOCUMENTS_REQUEST,
  FETCH_SENT_DOCUMENTS_SUCCESS,
} from "../constants/trackingConstants";
import {
  ADD_DOCUMENT_REQUEST,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAILURE,
} from "../constants/trackingConstants";
import axios from "axios";
// Action Creators
// export const fetchSentDocuments = (by, documentType, status) => {
//   return async (dispatch) => {
//     dispatch(fetchSentDocumentsRequest());

//     try {
//       const response = await axios.get("http://localhost:5000/api/sent", {
//         params: {
//           by,
//           documentType,
//           status,    
//         },
//       });
//       console.log(by)
//       dispatch(fetchSentDocumentsSuccess(response.data.documents));
//     } catch (error) {
//       console.error("Error fetching sent documents:", error);
//       dispatch(fetchSentDocumentsFailure(error.message));
//     }
//   };
// };

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


export const addDocument = (documentData) => {
  return async (dispatch) => {
    dispatch(addDocumentRequest());
    console.log(documentData)
    try {
      console.log(documentData);
      const data = {
        specificId: documentData,
      };
      const response = await axios.post(
        "http://localhost:5000/api/tracking",
        data
      );
      console.log(response)

      const document = response.data;
      console.log(document)

      dispatch(addDocumentSuccess(document));
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
      console.log(statusResponses)
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
