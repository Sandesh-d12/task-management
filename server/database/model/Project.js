const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    userId: {type: String, required: true}
    // tasks: { type: [TaskSchema], default: [] },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
