const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'ImageUploads/',
  filename: (req, file, cb) => {
    // Generate a unique file name here if needed
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }).single('image');

const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' });
  }

  // Process the uploaded file as needed
  // For example, you can move the file to a different location using fs or process it in some way

  res.status(200).json({ message: 'Image uploaded successfully' });
};

module.exports = {
  upload,
  uploadImage,
};
