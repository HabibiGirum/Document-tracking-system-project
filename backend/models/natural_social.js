const mongoose = require("mongoose");

const natural_socialSchema = new mongoose.Schema(
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
        "Natural And Social Sciences College Dean",
        "Natural And Social Sciences College",
        "Mathematics Department",
        "Language Department",
        "Physics and Statistics Department",
        "Social Sciences Department",
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

const Natural_social = mongoose.model("Natural_social", natural_socialSchema);

module.exports = Natural_social;
