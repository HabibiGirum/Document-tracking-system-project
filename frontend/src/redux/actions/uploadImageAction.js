import axios from "axios";
import { API_BASE_URL } from "../../config";
export const uploadImage = (image) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      await axios.post(`${API_BASE_URL}/uploadImage/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({ type: "UPLOAD_SUCCESS" });
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      dispatch({ type: "UPLOAD_FAILURE" });
      alert("Failed to upload image.");
    }
  };
};
