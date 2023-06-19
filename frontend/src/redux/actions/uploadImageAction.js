import axios from "axios";
import { API_BASE_URL } from "../../config";
import { UPLOAD_FAILED, UPLOAD_SUCCESS } from "../constants/imageUpload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const uploadImage = (image, tagNo) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post(
        `${API_BASE_URL}/uploadImage/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            tagNo: tagNo,
          },
        }
      );
      const { data } = response;

      if (data.similarity) {
        toast.success("The document is similar!");
      } else {
        toast.error("The document is not similar!");
      }
      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }

      dispatch({
        type: UPLOAD_SUCCESS,
        payload: data, //pass the response data to the reducer
      });
      alert("Image uploaded successfully!");
    } catch (error) {
      
      dispatch({
        type: UPLOAD_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });      
    }
  };
};
