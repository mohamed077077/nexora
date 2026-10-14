import mongoose from "mongoose";

import { AppError } from "@/lib/AppError";
import connectDB from "@/lib/db/connect";

import Order from "@/lib/db/models/Order";

export async function deleteOrder(id: string) {
  await connectDB();

  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Invalid order ID", 400);
  }

  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return order;
}
