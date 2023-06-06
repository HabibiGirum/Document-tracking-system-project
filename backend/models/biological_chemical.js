const mongoose = require("mongoose");

const biological_chemicalSchema = new mongoose.Schema(
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
        "Biological And Chemical College Dean",
        "Biological And Chemical Collage",
        "Biotechnology Department",
        "Chemical Department",
        "Environmental Department",
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

const Biological_chemical = mongoose.model(
  "Biological_chemical",
  biological_chemicalSchema
);

module.exports = Biological_chemical;
