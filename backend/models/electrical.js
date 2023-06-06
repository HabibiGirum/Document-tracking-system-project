const mongoose = require("mongoose");

const electricalSchema = new mongoose.Schema(
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
        "Electrical And Mechanical Collage Dean",
        "Electrical And Mechanical Collage",
        "Electrical and Computer Department",
        "Electromechanical Department",
        "Mechanical Department",
        "Software Department",
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

const Electrical = mongoose.model("Electrical", electricalSchema);

module.exports = Electrical;
