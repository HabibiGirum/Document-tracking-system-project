import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import sentReducer from "./reducers/sentReducer";
import trackingReducer from "./reducers/trackingReducer";
import { userLoginReducer, registerReducer } from "./reducers/userReducers";
import {requestReducer} from "../redux/reducers/requestReducers";

const rootReducer = combineReducers({
  sentDocuments: sentReducer,
  tracking: trackingReducer,
  userLogin: userLoginReducer,
  userRegister: registerReducer,
  requests: requestReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const isAuthenticated = userInfoFromStorage !== null;

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
