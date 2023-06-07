const asyncHandler = require("express-async-handler");
const StatusCodes = require("http-status-codes");
const Request = require("../models/requests");
const Tracking = require("../models/tracking");
const Applied = require("../models/applied");
const Architecture_civil = require("../models/architecture_civil");
const Biological_chemical = require("../models/biological_chemical");
const Electrical = require("../models/electrical");
const Natural_social = require("../models/natural_social");
const Vice_PresidentSchema = require("../models/vicePresident");
const BadRequestError = require("../errors/bad-request");
const Document = require("../models/requests");
const Human_Resources = require("../models/humanResource");

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

exports.startTracking = async (req, res) => {
  try {
    const { specificId } = req.body; // Assuming specificId is provided in the request body

    // Create a new tracking document
    console.log(specificId,"start tra")
    const trackingInfo = new Tracking({
      specificId,
      department: false,
      college: false,
      vicepresident: false,
      humanResource: false,
    });

    // Save the tracking document
    await trackingInfo.save();

    // Create a new document
    // const document = new Document({
    //   // Populate document fields based on your requirements
    // });

    // // Save the document
    // await document.save();

    res
      .status(201)
      .json({ message: "Tracking started and document added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSentDocuments = async (req, res) => {
  console.log(req.body);
  try {
    const { fullName, documentType, status } = req.query;

    // Build the query object to filter documents
    const query = {
      fullName: fullName, // Filter by specific user ID
    };

    if (documentType) {
      query.documentType = documentType;
    }

    if (status) {
      query.status = status;
    }

    const documents = await Electrical.find(query);
    console.log(documents)
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
    console.log(specificId,"-------------")
    // Find the tracking document by specificId
    const trackingInfo = await Tracking.findOne({
      specificId,
    });
    if (!trackingInfo) {
      return res.status(404).json({ error: "Tracking information not found" });
    }

    // Return the tracking information'
    console.log(trackingInfo);
    return res.json(trackingInfo);
    
  } catch (error) {
    console.error("Error retrieving tracking information:", error);
    return res.status(500).json({ error: "Internal server error" });
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
    const userInfo = JSON.parse(req.query.userInfo);
    const College = userInfo.college;
    const role = userInfo.role;
    console.log(role);
    console.log(typeof College);
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
        break;
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
        break;
      case "3":
        to = userInfo.college;
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
        break;
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

    console.log(College);
    console.log(data);
    // const requests = await Request.find();
    // console.log(JSON.stringify(requests));

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// Create a new
exports.createRequest = async (req, res) => {
  const {
    fullName,
    department,
    documentType,
    purpose,
    to,
    filename,
    roll,
    id,
    college
  } = req.body;
  //console.log(+ "this is request body");

  console.log(to);
  console.log(department);
  console.log(fullName);
  console.log(documentType);
  console.log(purpose);
  console.log(roll);
  console.log(filename);
  console.log(id);
  console.log(college);

  if (!documentType || !purpose || !to) {
    throw new BadRequestError("Please Provide All Values");
  }

  let Applied_Collage;
  let Architecture_civil_Collage;
  let Biological_chemical_Collage;
  let Electrical_Collage;
  let Vice_PresidentSchema_Collage;
  let Natural_social_Collage;
  let Documents;
  let HumanResources;

  if (roll === "Lecturer" || to === "Lecturer") {
    Documents = await Document.create(req.body);
  }

  if (
    roll === "Applied Sciences College Dean" ||
    to === "Applied Sciences College" ||
    to === "Geology Department" ||
    to === "Industrial Chemistry Department" ||
    to === "Food Science and Applied Nutrition Department"
  ) {
    Applied_Collage = await Applied.create(req.body);
  }

  if (
    roll === "Architecture And Civil College Dean" ||
    to === "Architecture And Civil College" ||
    to === "Architecture Department" ||
    to === "Civil Department" ||
    to === "Mining Department"
  ) {
    Architecture_civil_Collage = await Architecture_civil.create(req.body);
  }

  if (
    roll === "Electrical And Mechanical Collage Dean" ||
    to === "Electrical And Mechanical Collage" ||
    to === "Electrical and Computer Department" ||
    to === "Electromechanical Department" ||
    to === "Mechanical Department" ||
    to === "Software Department"
  ) {
    Electrical_Collage = await Electrical.create(req.body);
  }

  if (
    roll === "Biological And Chemical College Dean" ||
    to === "Biological And Chemical Collage" ||
    to === "Biotechnology Department" ||
    to === "Chemical Department" ||
    to === "Environmental Department"
  ) {
    Biological_chemical_Collage = await Biological_chemical.create(req.body);
  }

  if (
    roll === "Natural And Social Sciences College Dean" ||
    to === "Natural And Social Sciences College" ||
    to === "Mathematics Department" ||
    to === "Language Department" ||
    to === "Physics and Statistics Department" ||
    to === "Social Sciences Department"
  ) {
    Natural_social_Collage = await Natural_social.create(req.body);
  }
  if (roll === "Vice President" || to === "Vice President") {
    Vice_PresidentSchema_Collage = await Vice_PresidentSchema.create(req.body);
  }
  if(roll === 'Human Resources' || to === 'Human Resources'){
    HumanResources = await Human_Resources.create(req.body);
  }

  return res.status(StatusCodes.CREATED).json({
    Natural_social_Collage,
    Vice_PresidentSchema_Collage,
    Electrical_Collage,
    Biological_chemical_Collage,
    Architecture_civil_Collage,
    Applied_Collage,
    Documents,
    HumanResources
  });
};

