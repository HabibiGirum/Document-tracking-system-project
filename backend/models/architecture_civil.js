const mongoose = require("mongoose");

const architecture_civilSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true, //true
    },
    department: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    documentType: {
      type: String,
      required: true,
      enum: ["Leave", "Recruitment", "Promotion"],
    },
    purpose: {
      type: String,
      required: true,
      maxlength: 100,
    },
    to: {
      type: String,
      required: true,
      enum: [
        "Architecture And Civil College Dean",
        "Architecture And Civil College",
        "Architecture Department",
        "Civil Department",
        "Mining Department",
        "Human Resources",
        "Vice President",
      ],
      default: "Lecturer",
    },
    filename: {
      type: String,
      required: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

const Architecture_civil = mongoose.model(
  "Architecture_civil",
  architecture_civilSchema
);

module.exports = Architecture_civil;
