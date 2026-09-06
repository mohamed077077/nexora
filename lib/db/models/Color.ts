import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    iconUrl: {
      type: String,
      required: true,
    }
  }
);

export default mongoose.models.Color || mongoose.model("Color", ColorSchema);