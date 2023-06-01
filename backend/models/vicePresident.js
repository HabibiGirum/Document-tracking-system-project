const mongoose = require("mongoose");

const Vice_PresidentSchema = new mongoose.Schema(
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

const Vice_President = mongoose.model("Vice_President", Vice_PresidentSchema);

module.exports = Vice_President;
