import React, { useState } from 'react';

const ImageUploadForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      fetch('/process_image', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          setExtractedText(data.text);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit">Upload</button>
      </form>
      {extractedText && <div>{extractedText}</div>}
    </div>
  );
};

export default ImageUploadForm;
