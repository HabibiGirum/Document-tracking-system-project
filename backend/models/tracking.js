  const mongoose = require("mongoose");

  // Define the schema
  const trackingSchema = new mongoose.Schema({
    department: {
      type: Boolean,
      required: true,
      default: false,
    },
    college: {
      type: Boolean,
      required: true,
      default: false,
    },
    vicepresident: {
      type: Boolean,
      required: true,
      default: false,
    },
    humanResource: {
      type: Boolean,
      required: true,
      default: false,
    },
    specificId: {
      type: String, // Assuming specificId is a string
      required: true,
    },
  });

  // Create the model
  const Tracking = mongoose.model("Tracking", trackingSchema);

  // Export the model
  module.exports = Tracking;
