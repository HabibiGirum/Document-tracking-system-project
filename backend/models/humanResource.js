const mongoose = require("mongoose");

const HumanResourcesSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,//true
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
      enum: ["2","Leave", "Recruitment", "Promotion"],
    },
    purpose: {
      type: String,
      required: true,
      maxlength: 100,
    },
    to: {
      type: String,
      required: true,
      enum: ["1","Department", "College", "HR", "Vice President"],
      default: "Department",
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

const Human_Resources = mongoose.model("HumanResources", HumanResourcesSchema);

module.exports = Human_Resources;