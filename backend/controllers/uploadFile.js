const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const college = req.params.college;
    const roll = req.params.roll;

    console.log(college, roll);

    let destinationFolder = "uploads/";

    try {
      if (college === "College_of_Electrical_and_Mechanical_Engineering") {
        destinationFolder += "ECE_MECH/";
      } else if (college === "College_of_Applied_Science") {
        destinationFolder += "Applied_Sciences/";
      } else if (college === "College_of_Biological_and_Chemical_Engineering") {
        destinationFolder += "BIO_CHEM/";
      } else if (college === "College_of_Architecture_and_Civil_Engineering") {
        destinationFolder += "ARCH_CIVIL/";
      } else if (college === "College_of_Natural_and_Social_Science") {
        destinationFolder += "NATU_SOCI/";
      }

      if (roll === "Human_Resources") {
        destinationFolder += "HR/";
      } else if (roll === "Vice President") {
        destinationFolder += "VP/";
      }
    } catch (error) {
      console.error("Error retrieving college and roll:", error);
    }

    cb(null, destinationFolder);
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const now = new Date();
    const year = now.getFullYear();
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    const hours = ("0" + now.getHours()).slice(-2);
    const minutes = ("0" + now.getMinutes()).slice(-2);
    const seconds = ("0" + now.getSeconds()).slice(-2);
    const extension = path.extname(originalname); // Get the file extension
    const filenameWithoutExtension = path.basename(originalname, extension); // Get the filename without extension
    const uniqueFilename = `${year}${month}${day}_${hours}${minutes}${seconds}_${filenameWithoutExtension}${extension}`; // Append timestamp before the extension

    cb(null, uniqueFilename);
  },
});

const uploadFile = multer({ storage }).single("file");

const handleUpload = (req, res) => {
  uploadFile(req, res, function (error) {
    if (error) {
      console.error("Error uploading file:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const file = req.file;
    const originalFilename = file.originalname;
    const filePath = path.join(__dirname, file.destination, originalFilename);

    fs.rename(file.path, filePath, (error) => {
      if (error) {
        console.error("Error moving file:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      res.sendStatus(200);
    });
  });
};

module.exports = {
  uploadFile: handleUpload,
};
