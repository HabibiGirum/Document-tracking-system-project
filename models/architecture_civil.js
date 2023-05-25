const mongoose = require("mongoose");

const architecture_civilSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    by: {
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
      enum: ["Department", "College", "HR", "Vice President"],
      default: "Department",
    },
    filename: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Architecture_civil = mongoose.model(
  "Architecture_civil",
  architecture_civilSchema
);

module.exports = Architecture_civil;
