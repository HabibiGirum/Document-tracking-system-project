import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// <<<<<<< HEAD
// import registerReducer from "./reducers/userReducers";
// import { userLoginReducer } from "./reducers/userReducers";
// <<<<<<< HEAD
// =======
import { userLoginReducer, registerReducer } from "./reducers/userReducers";

// >>>>>>> Home
// =======
import requestReducer from "./reducers/requestReducers"; // Import the requestReducer
import { document_request_reducer } from "./reducers/Document_Reducers";
// >>>>>>> document_request

const rootReducer = combineReducers({
  // register: registerReducer,
  userLogin: userLoginReducer,
  userRegister: registerReducer,
  document_request: document_request_reducer,
  requests: requestReducer, // Add the requestReducer to the root reducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const documentItemsFromStorage = localStorage.getItem("docInfo")
  ? JSON.parse(localStorage.getItem("docInfo"))
  : [];

const initialState = {
  register: {
    userInfo: userInfoFromStorage,
    loading: false,
    success: false,
    error: null,
  },
  document:{
    docInfo:documentItemsFromStorage
  }
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
