import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userLoginReducer, registerReducer } from "./reducers/userReducers";
import requestReducer from "./reducers/requestReducers";
import sentReducer from "./reducers/sentReducer";

const rootReducer = combineReducers({
  sentDocuments: sentReducer,
  userLogin: userLoginReducer,
  userRegister: registerReducer,
  requests: requestReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? localStorage.getItem("userInfo")
  : null;
console.log(userInfoFromStorage)
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
