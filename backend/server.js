// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const requestRoutes = require("./routes/requestRoutes");
const trackingRoutes = require("./routes/trackingRoutes");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

// Load environment variables
dotenv.config();

/******************* this is file upload */
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const college = req.body.college;
    const roll = req.body.roll;
    console.log(college, "this is college");
    console.log(roll, "this is roll");

    let destinationFolder = "uploads/"; // Default destination folder

    try {
      // Update destinationFolder based on college and roll values
      if (college === "Electrical And Mechanical Collage") {
        destinationFolder += "ECE_MECH/";
      } else if (college === "College of Applied Sciences") {
        destinationFolder += "Applied_Scinces/";
      } else if (college === "Biological And Chemical Collage") {
        destinationFolder += "BIO_CHEM/";
      } else if (college === "Architecture And Civil College") {
        destinationFolder += "ARCH_CIVIL/";
      } else if (college === "Natural And Social Sciences College") {
        destinationFolder += "NATU_SOCI/";
      }

      if (roll === "Human Resources") {
        destinationFolder += "HR/";
      } else if (roll === "Vice President") {
        destinationFolder += "VP/";
      }
    } catch (error) {
      console.error("Error retrieving college and roll:", error);
    }

    cb(null, destinationFolder); // Set the destination folder
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    cb(null, originalname); // Use the original filename
  },
});

const upload = multer({ storage: storage }); // Use the custom storage configuration

// File upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  // Access the uploaded file via req.file
  console.log(req.file);

  // Access the original filename
  const originalFilename = req.file.originalname;
  console.log("Original Filename:", originalFilename);

  // Handle further processing, e.g., save the file path to a database, perform additional operations, etc.

  res.sendStatus(200); // Send a success status code
});


/** the end of file upload */

// CORS middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(morgan("dev"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the Express server
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api", trackingRoutes);

// Route to get a file by filename
app.get("/api/files/:filename", async (req, res) => {
  const { filename } = req.params;

  // Construct the file path
  const filePath = path.join(__dirname, "./store", filename);

  try {
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: "File not found" });
      return;
    }

    // Set the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=${filename}`);

    // Create a read stream to efficiently stream the file contents
    const fileStream = fs.createReadStream(filePath);

    // Pipe the file stream to the response stream
    fileStream.pipe(res);
  } catch (error) {
    console.log("Error opening file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(res);
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
