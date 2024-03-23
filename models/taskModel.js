const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "must provide the name"],
    maxlength: [20, "name can not be more thant 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
});

module.exports = mongoose.model("Task", taskSchema);
