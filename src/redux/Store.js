import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
<<<<<<< HEAD
import registerReducer from "./reducers/userReducers";
import { userLoginReducer } from "./reducers/userReducers";
=======
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
>>>>>>> Home

const rootReducer = combineReducers({
  register: registerReducer,
  userLogin: userLoginReducer,
  userRegister:userRegisterReducer
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
