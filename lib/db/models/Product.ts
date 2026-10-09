import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
    trim: true,
  },

  colorName: {
    type: String,
    required: true,
    trim: true,
  },

  size: {
    type: mongoose.Schema.Types.Union,
    of: [
      Number,
      { type: String, trim: true, uppercase: true },
    ],
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
    min: 0,
  },
});

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  gender: {
    type: String,
    enum: ["men", "women", "boys", "girls", "all"],
    default: "all",
  },

  variants: {
    type: [VariantSchema],
  },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);