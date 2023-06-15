const multer = require("multer");
const { createWorker } = require("tesseract.js");
const { imageHash } = require("image-hash");
const hashEquals = require("hash-equals");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: "ImageUploads/",
  filename: (req, file, cb) => {
    // Generate a unique file name here if needed
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }).single("image");

const worker = createWorker({
  logger: (m) => console.log(m),
});

const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image provided" });
  }

  // Process the uploaded file as needed
  // For example, you can move the file to a different location using fs or process it in some way
  const imgPath = req.query.tagNo;
  console.log(imgPath);
  const imagePath = req.file.path;
  
  // Check if the stored image exists
  const storedImagePath = `educational_images/${imgPath}.jpg`;
  if (!fs.existsSync(storedImagePath)) {
    return res.status(400).json({ errorMessage: "This is a fake document" });
  }

  // Extract text from image
  try {
    await (await worker).load();
    await (await worker).loadLanguage("eng");
    await (await worker).initialize("eng");
    await (
      await worker
    ).setParameters({
      tessedit_char_whitelist:
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    });
    const { data } = await (await worker).recognize(imagePath);
    console.log(data.text);
    await (await worker).terminate();
    
    // Compare the uploaded image with the stored image
    const similarity = await compareImages(imagePath, storedImagePath);
    console.log("Similarity:", similarity);
    
    // Add spaces between words
    const formattedText = data.text.replace(/([a-z])([A-Z])/g, "$1 $2");

    res.status(200).json({
      message: "Image uploaded successfully",
      extractedText: formattedText,
      similarity,
    });
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to extract text from image" });
  }
};

const compareImages = async (imagePath1, imagePath2) => {
  return new Promise((resolve, reject) => {
    imageHash(imagePath1, 16, true, (error, hash1) => {
      if (error) {
        reject(error);
        return;
      }

      imageHash(imagePath2, 16, true, (error, hash2) => {
        if (error) {
          reject(error);
          return;
        }

        const similarity = hashEquals(hash1, hash2);
        resolve(similarity);
      });
    });
  });
};

module.exports = {
  upload,
  uploadImage,
};
