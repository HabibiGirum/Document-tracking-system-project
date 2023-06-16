// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const requestRoutes = require("./routes/requestRoutes");
const trackingRoutes = require("./routes/trackingRoutes");
const ImageRoutes = require("./routes/ImageUpload");
const docRoutes = require("./routes/uploadRoutes");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

// Load environment variables
dotenv.config();

/******************* this is file upload */
const app = express();

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
app.use("/api", docRoutes);
app.use("/api", ImageRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api", trackingRoutes);

// Route to get a file by filename
app.get("/api/files/:filename", async (req, res) => {
  const encodedFilename = req.params.filename;
  let filename = decodeURIComponent(encodedFilename);

  filename = filename.split(",");
  const destinationFolder = filename[1];
  const file = filename[0];

  // Construct the file path
  const filePath = path.join(__dirname, destinationFolder, file);

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
