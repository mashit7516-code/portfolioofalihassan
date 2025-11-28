import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  projectURL: { type: String, required: true },
});
export default mongoose.models.Project || mongoose.model("Project", projectSchema);