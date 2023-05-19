import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// <<<<<<< HEAD
// import registerReducer from "./reducers/userReducers";
// import { userLoginReducer } from "./reducers/userReducers";
// <<<<<<< HEAD
// =======
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
// >>>>>>> Home
// =======
import requestReducer from "./reducers/requestReducers"; // Import the requestReducer
// >>>>>>> document_request

const rootReducer = combineReducers({
  // register: registerReducer,
  userLogin: userLoginReducer,
  userRegister:userRegisterReducer,
  requests: requestReducer, // Add the requestReducer to the root reducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  register: {
    userInfo: userInfoFromStorage,
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
