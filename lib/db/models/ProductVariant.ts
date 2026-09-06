import mongoose from "mongoose";

const ProductVariantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    colorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
      required: true,
    },

    size: {
      type: mongoose.Schema.Types.Union,
      of: [
        Number,
        { type: String, trim: true, uppercase: true }
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
  }
);

export default mongoose.models.ProductVariant || mongoose.model("ProductVariant", ProductVariantSchema);