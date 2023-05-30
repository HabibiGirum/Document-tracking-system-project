const asyncHandler = require('express-async-handler')
const Request = require("../models/requests");
const Tracking = require("../models/tracking");
const Applied = require("../models/applied");
const Architecture_civil = require("../models/architecture_civil");
const Biological_chemical = require("../models/biological_chemical");
const Electrical = require("../models/electrical");
const Natural_social = require("../models/natural_social");



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
  console.log(req.body)
  try {
    const { by, documentType, status } = req.query;

    // Build the query object to filter documents
    const query = {
      by:by, // Filter by specific user ID
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
    const userInfo = JSON.parse(req.query.userInfo)
    const College = userInfo.college
    const role = userInfo.role
    console.log(role)
    console.log(typeof (College))
    let data = "";
    let query;
    const name = userInfo.name;
    const to = userInfo.department;
    
    switch (role) {
      case "1":
        
        query = { to: name };
                  switch (College) {
                    case "1":
                      // code block
                      data = await Request.find(query);
                      break;
                    case "2":
                      // code block
                      data = await Biological_chemical.find(query);
                      break;
                    case "3":
                      // code block
                      data = await Applied.find(query);
                      break;
                    case "4":
                      // code block
                      data = await Natural_social.find(query);
                      break;
                    case "5":
                      data = await Architecture_civil.find(query);
                      break;
                    default:
                    // code block
                  }
        break
      case "2":
        query = { to: to };
                          switch (College) {
                            case "1":
                              // code block
                              data = await Request.find(query);
                              break;
                            case "2":
                              // code block 
                              data = await Biological_chemical.find(query);
                              break;
                            case "3":
                              // code block
                              data = await Applied.find(query);
                              break;
                            case "4":
                              // code block
                              data = await Natural_social.find(query);
                              break;
                            case "5":
                              data = await Architecture_civil.find(query);
                              break;
                            default:
                            // code block
                          }
        break
      case "3":
        to = userInfo.college
                query = { to: to };
                          switch (College) {
                            case "1":
                              // code block
                              data = await Request.find(query);
                              break;
                            case "2":
                              // code block 
                              data = await Biological_chemical.find(query);
                              break;
                            case "3":
                              // code block
                              data = await Applied.find(query);
                              break;
                            case "4":
                              // code block
                              data = await Natural_social.find(query);
                              break;
                            case "5":
                              data = await Architecture_civil.find(query);
                              break;
                            default:
                            // code block
                          }
        break
      case "4":
                query = { to: to };
                          switch (College) {
                            case "1":
                              // code block
                              data = await Request.find(query);
                              break;
                            case "2":
                              // code block 
                              data = await Biological_chemical.find(query);
                              break;
                            case "3":
                              // code block
                              data = await Applied.find(query);
                              break;
                            case "4":
                              // code block
                              data = await Natural_social.find(query);
                              break;
                            case "5":
                              data = await Architecture_civil.find(query);
                              break;
                            default:
                            // code block
                          }



    }
    

    console.log(College)
    console.log(data)
    // const requests = await Request.find();
    // console.log(JSON.stringify(requests));

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// Create a new request
exports.createRequest = async (req, res) => {
  const { fullName, department, documentType, purpose, to } = req.body;

  try {
    // Create the request in the database
    const request = await Request.create({
      fullName,
      department,
      documentType,
      purpose,
      to,
    });
    console.log(request);
    // Return the created request as a response
    res.status(201).json(request);

  } catch (error) {
        // Handle any errors that occur during the creation process
    console.error("Error creating request:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};


