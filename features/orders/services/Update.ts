import mongoose from "mongoose";

import { AppError } from "@/lib/AppError";
import connectDB from "@/lib/db/connect";

import Order from "@/lib/db/models/Order";
import { ORDER_STATUS, type OrderStatus } from "../validations/orderSchema";

export async function updateOrderStatus(id: string, status: OrderStatus) {
  await connectDB();

  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Invalid order ID", 400);
  }

  if (!ORDER_STATUS.includes(status)) {
    throw new AppError("Invalid order status", 400);
  }

  const order = await Order.findById(id);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  // Only change the status, nothing else
  order.status = status;

  await order.save();

  return order;
}

export async function updateOrder(
  id: string,
  { status }: { status: OrderStatus }
) {
  return updateOrderStatus(id, status);
}
