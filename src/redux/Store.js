import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister:userRegisterReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
    userLogin:{userInfo:userInfoFromStorage}
};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
