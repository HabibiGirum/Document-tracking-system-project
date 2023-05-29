import {
  FETCH_SENT_DOCUMENTS_FAILURE,
  FETCH_SENT_DOCUMENTS_REQUEST,
  FETCH_SENT_DOCUMENTS_SUCCESS,
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



export const fetchSentDocuments = (by, documentType, status) => {
  return async (dispatch) => {
    dispatch(fetchSentDocumentsRequest());

    try {
      const response = await axios.get(`http://localhost:5000/api/sent`, {
        params: {
          by,
          documentType,
          status,
        },
      });

      const documents = response.data.documents;
      const documentIds = documents.map((document) => document._id);

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
