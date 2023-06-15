import { UPLOAD_FAILED, UPLOAD_SUCCESS } from "../constants/imageUpload";

const initialState = {
  uploading: false,
  uploadError: false,
  data: null,
  error: null,
};

export const uploadImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_SUCCESS:
      return {
        ...state,
        uploading: false,
        uploadError: false,
        data: action.payload,
        error: null,
      };
    case UPLOAD_FAILED:
      return {
        ...state,
        uploading: false,
        uploadError: true,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
