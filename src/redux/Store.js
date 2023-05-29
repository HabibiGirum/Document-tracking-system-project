import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userLoginReducer, registerReducer } from "./reducers/userReducers";

// >>>>>>> Home
// =======
import requestReducer from "./reducers/requestReducers"; // Import the requestReducer
import { document_request_reducer } from "./reducers/Document_Reducers";
// >>>>>>> document_request
import requestReducer from "./reducers/requestReducers";
import sentReducer from "./reducers/sentReducer";

const rootReducer = combineReducers({
  sentDocuments: sentReducer,
  userLogin: userLoginReducer,
  userRegister: registerReducer,

  document_request: document_request_reducer,
  requests: requestReducer, // Add the requestReducer to the root reducer

});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? localStorage.getItem("userInfo")
  : null;
console.log(userInfoFromStorage)
const isAuthenticated = userInfoFromStorage !== null;

const documentItemsFromStorage = localStorage.getItem("docInfo")
  ? JSON.parse(localStorage.getItem("docInfo"))
  : [];

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
