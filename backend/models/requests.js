const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
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

        "Applied Sciences College Dean",
        "Applied Sciences College",
        "Geology Department",
        "Industrial Chemistry Department",
        "Food Science and Applied Nutrition Department",

        "Architecture And Civil College Dean",
        "Architecture And Civil College",
        "Architecture Department",
        "Civil Department",
        "Mining Department",

        "Biological And Chemical College Dean",
        "Biological And Chemical Collage",
        "Biotechnology Department",
        "Chemical Department",
        "Environmental Department",
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

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
