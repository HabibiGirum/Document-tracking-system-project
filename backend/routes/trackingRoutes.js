const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");

// GET route to retrieve tracking information for a specific document
router.get("/tracking/:specificId", requestController.getTrackingInfo);

router.put("/tracking/update/:id", requestController.updateTrackingById);

router.post("/tracking", requestController.startTracking);

// router.get("/tracking/sent", requestController.getAllRequests);

router.get("/sent", requestController.getSentDocuments);

// router.get("/api/tracking/:id", requestController.getTrackingById);

router.post("/tracking/updateRole", requestController.sendAcceptanceMessage);

module.exports = router;
