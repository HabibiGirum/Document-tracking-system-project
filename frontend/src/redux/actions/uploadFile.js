import axios from "axios";
import { API_BASE_URL } from "../../config";

export const uploadFile = (selectedFile, college, roll) => {
  return async (dispatch) => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("college", college);
    formData.append("roll", roll);

    try {
      let url = "";
      if (roll === "Human Resources") {
        const rollFormatted = roll.replace(/ /g, "_");
        url = `${API_BASE_URL}/upload/${rollFormatted}`;
      } else if (roll === "Vice President") {
        const rollFormatted = roll.replace(/ /g, "_");
        url = `${API_BASE_URL}/upload/${rollFormatted}`;
      } else {
        const collegeFormatted = college.replace(/ /g, "_");
        url = `${API_BASE_URL}/upload/${collegeFormatted}`;
      }

      await axios.post(url, formData);
      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
};
