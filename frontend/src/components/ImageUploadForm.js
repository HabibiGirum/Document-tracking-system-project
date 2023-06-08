import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../redux/actions/uploadImageAction';

const ImageUploadForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.uploading);
  const uploadError = useSelector((state) => state.uploadError);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedImage) {
      alert('Please select an image.');
      return;
    }

    dispatch(uploadImage(selectedImage));
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {uploadError && <p>Failed to upload image.</p>}
      </form>
    </div>
  );
};

export default ImageUploadForm;
