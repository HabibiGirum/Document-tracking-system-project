import {
  CREATE_REQUEST_BEGIN,
  CREATE_REQUEST_FAIL,
  CREATE_REQUEST_SUCCESS,
} from "../constants/requestConstants";
import axios from 'axios'
export const documentRequest = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_REQUEST_BEGIN,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("api/request", { data }, config);
    dispatch({ type: CREATE_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
