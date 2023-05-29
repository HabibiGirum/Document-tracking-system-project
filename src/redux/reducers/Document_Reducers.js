import {
  CREATE_REQUEST_BEGIN,
  CREATE_REQUEST_FAIL,
  CREATE_REQUEST_SUCCESS,
} from "../constants/requestConstants";

export const document_request_reducer=(state={},action)=>{

    switch (action.type) {
        case CREATE_REQUEST_BEGIN:
            return {loading:true}
        case CREATE_REQUEST_SUCCESS:
            return {loading: false, docInfo: action.payload} 
        case CREATE_REQUEST_FAIL:
            return {loading:false,error:action.payload}     
        default:
            return state;
    }
}