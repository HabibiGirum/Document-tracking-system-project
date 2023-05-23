
const Request = require("../models/requests");
const Tracking = require("../models/tracking");


exports.getTrackingById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the tracking information based on the document ID
    const trackingInfo = await Tracking.findOne({ documentId: id });

    if (!trackingInfo) {
      return res.status(404).json({ error: "Tracking information not found" });
    }

    res.json(trackingInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



exports.getSentDocuments = async (req, res) => {
  try {
    const { by, documentType, status } = req.query;

    // Build the query object to filter documents
    const query = {
      by, // Filter by specific user ID
    };

    if (documentType) {
      query.documentType = documentType;
    }

    if (status) {
      query.status = status;
    }

    const documents = await Request.find(query);

    res.json({ documents });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Controller function to retrieve tracking information
exports.getTrackingInfo = async (req, res) => {
  try {
    const { specificId } = req.params; // Assuming specificId is passed as a URL parameter
    // Find the tracking document by specificId
    const trackingInfo = await Tracking.findOne({
      specificId
    });
    if (!trackingInfo) {
      return res.status(404).json({ error: 'Tracking information not found' });
    }

    // Return the tracking information
    return res.json(trackingInfo);
  } catch (error) {
    console.error('Error retrieving tracking information:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateTrackingById = async (req, res) => {
  try {
    const { id } = req.params;
    const { fieldToUpdate } = req.body;

    // Construct the update object dynamically
    const update = {};
    update[fieldToUpdate] = true;

    const trackingInfo = await Tracking.findOneAndUpdate(
      { specificId: id },
      {
        $set: update,
      },
      { new: true }
    );

    if (!trackingInfo) {
      return res.status(404).json({ error: "Tracking information not found" });
    }

    res.json(trackingInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Get all requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    console.log(JSON.stringify(requests));

    res.status(201).json(requests);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// Create a new request
exports.createRequest = async (req, res) => {
  const { from, by, DocumentType, purpose, To, filename, createdBy } = req.body;

  try {
    const request = await Request.create({
      from,
      by,
      DocumentType,
      purpose,
      To,
      filename,
      createdBy,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
