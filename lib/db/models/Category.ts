import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
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

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);