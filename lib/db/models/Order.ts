import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  variant: {
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
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    customerPhone: {
      type: String,
      required: true,
      trim: true,
    },

    customerAddress: {
      type: String,
      required: true,
      trim: true,
    },

    customerLocationUrl: {
      type: String,
      required: true,
      trim: true,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      required: true,
      enum: [
        "pending",
        "confirmed",
        "success",
        "cancelled",
      ],
    },

    items: {
      type: [OrderItemSchema],
      },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);