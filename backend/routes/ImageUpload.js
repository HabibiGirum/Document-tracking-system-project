const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadImage');

// Define the upload route
router.post('/uploadImage', uploadController.upload, uploadController.uploadImage);

module.exports = router;
