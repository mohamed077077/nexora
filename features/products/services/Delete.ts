import mongoose from "mongoose";

import { AppError } from "@/lib/AppError";
import connectDB from "@/lib/db/connect";

import Product from "@/lib/db/models/Product";

export async function deleteProduct(id: string) {
  await connectDB();

  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Invalid product ID", 400);
  }

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
}