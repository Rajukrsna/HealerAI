const mongoose = require("mongoose");

const poseSchema = new mongoose.Schema({
  image: { type: String, required: true },
  description: { type: String, required: true }
});

const yogaSchema = new mongoose.Schema({
  emotion: { type: String, required: true, unique: true },
  detail: { type: String, required: true },
  poses: {
    type: Map,
    of: poseSchema,
    required: true
  }
});

module.exports = mongoose.model("Yoga", yogaSchema);
