import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import registerReducer from "./reducers/userReducers";
import { userLoginReducer } from "./reducers/userReducers";
import requestReducer from "./reducers/requestReducers"; // Import the requestReducer

const rootReducer = combineReducers({
  register: registerReducer,
  userLogin: userLoginReducer,
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
