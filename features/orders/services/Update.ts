import mongoose from "mongoose";

import { AppError } from "@/lib/AppError";
import connectDB from "@/lib/db/connect";

import Order from "@/lib/db/models/Order";
import Product from "@/lib/db/models/Product";
import { ORDER_STATUS, type OrderStatus } from "../validations/orderSchema";

export async function updateOrderStatus(id: string, status: OrderStatus) {
  await connectDB();

  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Invalid order ID", 400);
  }

  if (!ORDER_STATUS.includes(status)) {
    throw new AppError("Invalid order status", 400);
  }

if (status !== "cancelled") {
  const updated = await Order.findOneAndUpdate(
    { _id: id, status: { $nin: ["cancelled", "success"] } },
    { status },
    { new: true }
  );

  if (!updated) {
    const existing = await Order.findById(id).select("status").lean();
    if (!existing) throw new AppError("Order not found", 404);
    throw new AppError(`${existing.status} orders can't be changed`, 400);
  }

  return updated;
}

  const order = await Order.findOneAndUpdate(
    { _id: id, status: { $in: ["pending", "confirmed"] } },
    { status: "cancelled" },
    { new: false } 
  );

  if (!order) {
    const exists = await Order.exists({ _id: id });
    if (!exists) throw new AppError("Order not found", 404);
    throw new AppError("This order can't be cancelled", 400);
  }

  try {
    await Product.bulkWrite(
      order.items.map((item: any) => ({
        updateOne: {
          filter: { _id: item.productId },
          update: { $inc: { "variants.$[v].stock": item.quantity } },
          arrayFilters: [
            { "v.color": item.variant.color, "v.size": item.variant.size },
          ],
        },
      }))
    );
  } catch (err) {
    await Order.updateOne({ _id: id }, { status: order.status });
    throw err;
  }

  order.status = "cancelled";
  return order;
}

export async function updateOrder(
  id: string,
  { status }: { status: OrderStatus }
) {
  return updateOrderStatus(id, status);
}