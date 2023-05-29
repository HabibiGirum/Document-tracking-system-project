import { useNavigate, useHistory } from "react-router-dom";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const addUserToLocalStorage = ({ user, token }) => {
  console.log(user,token)
  localStorage.setItem("userInfo", JSON.stringify(user));
  localStorage.setItem("token", token);
  // localStorage.setItem("department", department);
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  // localStorage.removeItem("department");
};
// const navigate = useNavigate()
export const login = (email, password) => async (dispatch) => {


  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${API_BASE_URL}/users/login`,
      { email, password },
      config
    );
      console.log(data.user)
    // Check if the login was successful
    if (data.token) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      // Set the user data in local storage
      // localStorage.setItem("userInfo", JSON.stringify(data.token));
      addUserToLocalStorage({user:data.user,token:data.token})
      console.log(data);
      // Redirect to the home page or the desired protected route
      window.location.href = "/home";

    } else {
      // Handle login failure
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    console.log(userData);
    // Make the registration API call
    const response = await axios.post(
      `${API_BASE_URL}/users/register`,
      userData
    );

    // Handle the response
    dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data.token });
    // Optionally, you can dispatch additional actions or handle the response here
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    // Optionally, you can dispatch additional actions or handle the error here
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/login";
};
