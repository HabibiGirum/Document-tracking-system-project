const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");

// GET /api/requests
router.get("/", requestController.getAllRequests);

// POST /api/requests
router.post("/", requestController.createRequest);

// GET route to retrieve tracking information for a specific document
router.get('/tracking/:specificId', requestController.getTrackingInfo);




module.exports = router;
