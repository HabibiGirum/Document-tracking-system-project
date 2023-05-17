import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
<<<<<<< HEAD
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
=======
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
>>>>>>> Home
} from "../constants/userConstants";



export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

<<<<<<< HEAD



const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, success: true };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default registerReducer;
=======
export const userRegisterReducer = (state ={},action)=>{
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {loading:true}
    case USER_REGISTER_SUCCESS:
      return {loading:false,userInfo:action.payload}
    case USER_REGISTER_FAIL:
      return {loading:false,error:action.payload}
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}
>>>>>>> Home
