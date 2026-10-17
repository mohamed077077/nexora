import mongoose from "mongoose";

import { AppError } from "@/lib/AppError";
import connectDB from "@/lib/db/connect";

import Order from "@/lib/db/models/Order";
import Product from "@/lib/db/models/Product";
import type { OrderStatus } from "../types";

type OrderItemInput = {
  productId: string;
  variant: {
    color: string;
    colorName?: string;
    size: string | number;
    image: string;
    stock: number;
  };
  quantity: number;
};

// Find a specific variant by product ID, color, and size.
const variantFilter = (item: OrderItemInput) => ({
  _id: item.productId,
  variants: {
    $elemMatch: {
      color: item.variant.color,
      size: item.variant.size,
    },
  },
});

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
  items: OrderItemInput[];
}) {
  await connectDB();

  // Validate order items.
  if (!items || !items.length) {
    throw new AppError("Order must have at least one item", 400);
  }

  const hasInvalidItem = items.some(
    (item) =>
      !item.productId ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      !item.variant ||
      !item.variant.color ||
      !item.variant.size ||
      !item.variant.image
  );

  if (hasInvalidItem) {
    throw new AppError("Invalid item data in order", 400);
  }

  // Validate product IDs.
  const hasInvalidProductId = items.some(
    (item) => !mongoose.isValidObjectId(item.productId)
  );

  if (hasInvalidProductId) {
    throw new AppError("Invalid product ID in order items", 400);
  }

  // Check that all referenced products exist.
  const productIds = Array.from(
    new Set(items.map((item) => item.productId))
  );

  const existingProductsCount = await Product.countDocuments({
    _id: { $in: productIds },
  });

  if (existingProductsCount !== productIds.length) {
    throw new AppError("One or more products not found", 404);
  }

  // Keep track of items whose stock was successfully reduced.
  const reserved: OrderItemInput[] = [];

  try {
    // Reserve stock for each requested item.
    for (const item of items) {
      const result = await Product.updateOne(
        {
          _id: item.productId,
          variants: {
            $elemMatch: {
              color: item.variant.color,
              size: item.variant.size,
              stock: { $gte: item.quantity },
            },
          },
        },
        {
          $inc: {
            "variants.$.stock": -item.quantity,
          },
        }
      );

      // No matching variant with sufficient stock was updated.
      if (result.modifiedCount === 0) {
        throw new AppError(
          `Not enough stock for ${item.variant.color} / ${item.variant.size}`,
          409
        );
      }

      // Record the successful stock reduction.
      reserved.push(item);
    }

    // Save the order only after reserving all requested stock.
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
  } catch (error) {
    await Promise.all(
      reserved.map((item) =>
        Product.updateOne(variantFilter(item), {
          $inc: { "variants.$.stock": item.quantity },
        })
      )
    );

    throw error;
  }
}
