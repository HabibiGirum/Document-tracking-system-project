const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/uploadFile');

router.post("/api/upload/:college", uploadFile);

module.exports = router;
