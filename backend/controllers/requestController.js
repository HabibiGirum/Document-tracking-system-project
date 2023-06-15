const asyncHandler = require("express-async-handler");
const StatusCodes = require("http-status-codes");
const Request = require("../models/requests");
const Tracking = require("../models/tracking");
const Applied = require("../models/applied");
const Architecture_civil = require("../models/architecture_civil");
const Biological_chemical = require("../models/biological_chemical");
const Electrical = require("../models/electrical");
const Natural_social = require("../models/natural_social");
const Vice_President = require("../models/vicePresident");
const BadRequestError = require("../errors/bad-request");
const Document = require("../models/requests");
const Human_Resources = require("../models/humanResource");
exports.sendAcceptanceMessage = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { id, role,accepted } = req.body;
  // Check if the request ID is provided
  if (!id) {
    throw new BadRequestError("Request ID is required");
  }

  // Find the request by ID
  const request = await Tracking.findOne({
    specificId: id,
  });

  // Check if the request exists
  if (!request) {
    return res.status(404).json({ error: "Request not found" });
  }
  if (accepted === true) {
      switch (role) {
        case "Department Head":
          request.department = true;
          break;
        case "College Dean":
          request.college = true;
          break;
        case "Vice President":
          request.vicepresident = true;
          break;
        case "Human Resources":
          request.humanResource = true
          request.accepted = true
          break;
        default:
          break;
      }
  } else if (accepted === false) {
    request.rejected = true
  }


  // Save the updated request
  await request.save();

  res
    .status(StatusCodes.OK)
    .json({ message: "Acceptance message sent successfully" });
});

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
    console.log(specificId, "start tra");
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
    console.log(documents);
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
    console.log(specificId, "-------------");
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
    const College = userInfo.college.replace(/\s/g, "").toLowerCase();
    const role = userInfo.role;
    console.log(role);
    console.log(College);
    let data = "";
    let query;
    const name = userInfo.name;
    let to = userInfo.department; // Use let instead of const for 'to'
    console.log(name);
    console.log(to);
    console.log(role, "role of the user");
    switch (role) {
      case "Lecturer":
        query = { to: name };
        switch (College) {
          case "collegeofelectricalandmechanicalengineering":
            // code block
            console.log("triggered");
            data = await Electrical.find(query);
            break;
          case "collegeofbiologicalandchemicalengineering":
            // code block
            data = await Biological_chemical.find(query);
            break;
          case "collegeofappliedscience":
            // code block
            data = await Applied.find(query);
            break;
          case "collegeofnaturalandsocialscience":
            // code block
            data = await Natural_social.find(query);
            break;
          case "collegeofarchitectureandcivilengineering":
            data = await Architecture_civil.find(query);
            break;
          default:
            // code block
            break;
        }
        break;
      case "Department Head":
        to = "Electrical and Computer Department";
        query = { to: to };
        switch (College) {
          case "collegeofelectricalandmechanicalengineering":
            // code block
            data = await Electrical.find(query);
            break;
          case "collegeofbiologicalandchemicalengineering":
            // code block
            data = await Biological_chemical.find(query);
            break;
          case "collegeofappliedscience":
            // code block
            data = await Applied.find(query);
            break;
          case "collegeofnaturalandsocialscience":
            // code block
            data = await Natural_social.find(query);
            break;
          case "collegeofarchitectureandcivilengineering":
            data = await Architecture_civil.find(query);
            break;
          default:
            // code block
            break;
        }
        break;
      case "College Dean":
        to = userInfo.college;
        query = { to: to };
        switch (College) {
          case "collegeofelectricalandmechanicalengineering":
            // code block
            data = await Electrical.find(query);
            break;
          case "collegeofbiologicalandchemicalengineering":
            // code block
            data = await Biological_chemical.find(query);
            break;
          case "collegeofappliedscience":
            // code block
            data = await Applied.find(query);
            break;
          case "collegeofnaturalandsocialscience":
            // code block
            data = await Natural_social.find(query);
            break;
          case "collegeofarchitectureandcivilengineering":
            data = await Architecture_civil.find(query);
            break;
          default:
            // code block
            break;
        }
        break;
      case "Vice President":
        to = "Vice President";
        query = { to: to };
        data = await Vice_President.find(query);
        break;
      case "Human Resources":
        to = "Human Resources";
        query = { to: to };
        data = await Human_Resources.find(query);
        break;
      default:
        break;
    }

    console.log(College);
    // const requests = await Request.find();
    // console.log(JSON.stringify(requests));

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// Create a new
exports.createRequest = async (req, res) => {
  console.log(req.body);
  const {
    fullName,
    department,
    documentType,
    purpose,
    to,
    filename,
    role,
    id,
    college,
  } = req.body;
  //console.log(+ "this is request body");

  console.log(to);
  console.log(department);
  console.log(fullName);
  console.log(documentType);
  console.log(purpose);
  console.log(role);
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

  if (role === "Lecturer" || to === "Lecturer") {
    Documents = await Document.create(req.body);
  }

  if (
    role === "Applied Sciences College Dean" ||
    (college === "College of Applied Science")
  ) {
    Applied_Collage = await Applied.create(req.body);
  }

  if (
    role === "Architecture And Civil College Dean" ||
    (
      college === "College of Architecture and Civil Engineering")
  ) {
    Architecture_civil_Collage = await Architecture_civil.create(req.body);
  }

  if (
    role === "Electrical And Mechanical Collage Dean" ||
    (
      college === "College of Electrical and Mechanical Engineering")
  ) {
    Electrical_Collage = await Electrical.create(req.body);
  }

  if (
    role === "Biological And Chemical College Dean" ||
    (
      college === "College of Biological and Chemical Engineering")
  ) {
    Biological_chemical_Collage = await Biological_chemical.create(req.body);
  }

  if (
    role === "Natural And Social Sciences College Dean" ||
    (
      college === "College of Natural and Social Science")
  ) {
    Natural_social_Collage = await Natural_social.create(req.body);
  }
  if (role === "Vice President" || to === "Vice President") {
    Vice_PresidentSchema_Collage = await Vice_PresidentSchema.create(req.body);
  }
  if (role === "Human Resources" || to === "Human Resources") {
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
    HumanResources,
  });
};
