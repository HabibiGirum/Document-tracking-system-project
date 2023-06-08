

const initialState = {
    uploading: false,
    uploadError: false
  };
  
  export const uploadImageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPLOAD_SUCCESS':
        return {
          ...state,
          uploading: false,
          uploadError: false
        };
      case 'UPLOAD_FAILURE':
        return {
          ...state,
          uploading: false,
          uploadError: true
        };
      default:
        return state;
    }
  };
  
  