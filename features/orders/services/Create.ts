import mongoose from "mongoose";

import { AppError } from "@/lib/AppError";
import connectDB from "@/lib/db/connect";

import Order from "@/lib/db/models/Order";
import Product from "@/lib/db/models/Product";
import type { OrderStatus } from "../types";

export async function createOrder({
  customerName,
  customerPhone,
  customerAddress,
  customerLocationUrl = "",
  totalPrice,
  status = "pending",
  items,
}: {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerLocationUrl?: string;
  totalPrice: number;
  status?: OrderStatus;
  items: {
    productId: string;
    variant: {
      color: string;
      colorName?: string;
      size: string | number;
      image: string;
    };
    quantity: number;
  }[];
}) {
  await connectDB();

  if (!items || !items.length) {
    throw new AppError("Order must have at least one item", 400);
  }

  const hasInvalidItem = items.some(
    (item) =>
      !item.productId ||
      !item.quantity ||
      item.quantity < 1 ||
      !item.variant ||
      !item.variant.color ||
      !item.variant.size ||
      !item.variant.image
  );

  if (hasInvalidItem) {
    throw new AppError("Invalid item data in order", 400);
  }

  const hasInvalidProductId = items.some(
    (item) => !mongoose.isValidObjectId(item.productId)
  );

  if (hasInvalidProductId) {
    throw new AppError("Invalid product ID in order items", 400);
  }

  const productIds = Array.from(new Set(items.map((item) => item.productId)));
  const existingProductsCount = await Product.countDocuments({
    _id: { $in: productIds },
  });

  if (existingProductsCount !== productIds.length) {
    throw new AppError("One or more products not found", 404);
  }

  const order = await Order.create({
    customerName,
    customerPhone,
    customerAddress,
    customerLocationUrl,
    totalPrice,
    status,
    items,
  });

  return order;
}
