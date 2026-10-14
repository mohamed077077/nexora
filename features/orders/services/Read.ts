import mongoose from "mongoose";

import { AppError } from "@/lib/AppError";
import connectDB from "@/lib/db/connect";

import Order from "@/lib/db/models/Order";
import "@/lib/db/models/Product";

export async function getOrders() {
  await connectDB();

  const orders = await Order.find()
    .populate("items.productId")
    .sort({ createdAt: -1 });

  return orders;
}

export async function getOrderById(id: string) {
  await connectDB();

  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Invalid order ID", 400);
  }

  const order = await Order.findById(id).populate("items.productId");

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return order;
}
