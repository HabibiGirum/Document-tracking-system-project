const multer = require('multer');
const { createWorker } = require('tesseract.js');

const storage = multer.diskStorage({
  destination: 'ImageUploads/',
  filename: (req, file, cb) => {
    // Generate a unique file name here if needed
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }).single('image');

const worker = createWorker({
  logger: (m) => console.log(m),
});

const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' });
  }

  // Process the uploaded file as needed
  // For example, you can move the file to a different location using fs or process it in some way

  const imagePath = req.file.path;

  try {
   await ( await worker).load();
    await (await worker).loadLanguage('eng');
    await (await worker).initialize('eng');
    await (await worker).setParameters({
      tessedit_char_whitelist: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    });
    const { data } = await (await worker).recognize(imagePath);
    console.log(data.text);
    await (await worker).terminate();

    res.status(200).json({ message: 'Image uploaded successfully', extractedText: data.text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to extract text from image' });
  }
};

module.exports = {
  upload,
  uploadImage,
};
