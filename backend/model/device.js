const uuid = require("uuid");
const mongoose = require("mongoose");
const deviceSchema = new mongoose.Schema({
  code: {
    type: String,
    required:true,
    unique: true
  },
  type: {
    type: String,
    enum: ["pos", "kisok", "signage"],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
  },
});
module.exports = mongoose.model("Device", deviceSchema);
