import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
  colorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Color",
    required: true,
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

  variants: {
    type: [VariantSchema],
  },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);