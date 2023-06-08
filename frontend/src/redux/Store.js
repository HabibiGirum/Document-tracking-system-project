import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userLoginReducer, registerReducer } from "./reducers/userReducers";
import { uploadImageReducer } from "./reducers/uploadImageReducer";

import { requestCreateReducer } from "./reducers/requestReducers";

import sentReducer from "./reducers/sentReducer";
import { uploadFileReducer } from "./reducers/uploadFileReducer";
const rootReducer = combineReducers({
  sentDocuments: sentReducer,
  userLogin: userLoginReducer,
  userRegister: registerReducer,
  requestCreate:requestCreateReducer,
  uploadFile:uploadFileReducer,
  uploadImage:uploadImageReducer,
  //requests: requestReducer, // Add the requestReducer to the root reducer

});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? localStorage.getItem("userInfo")
  : null;
console.log(userInfoFromStorage)
const isAuthenticated = userInfoFromStorage !== null;

const requestInfoFormStorage  = localStorage.getItem("data")
  ? JSON.parse(localStorage.getItem("data"))
  : [];
console.log(requestInfoFormStorage);
const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
    isAuthenticated: isAuthenticated,
    loading: false,
    error: null,
  },
  userRegister: {
    loading: false,
    success: false,
    error: null,
  },
  
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
