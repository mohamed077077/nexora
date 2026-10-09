import mongoose from "mongoose";

import { AppError } from "@/lib/AppError";
import connectDB from "@/lib/db/connect";

import Category from "@/lib/db/models/Category";
import Product from "@/lib/db/models/Product";

export async function createProduct({
  title,
  categoryId,
  gender,
  price,
  variants,
}: {
  title: string;
  categoryId: string;
  gender: string;
  price: number;
  variants: {
    color: string;
    colorName: string;
    size: string | number;
    image: string;
    stock: number;
  }[];
}) {
  await connectDB();

  if (!mongoose.isValidObjectId(categoryId)) {
    throw new AppError("Invalid category ID", 400);
  }

  if (!variants.length) {
    throw new AppError(
      "Product must have at least one variant",
      400
    );
  }

  const hasInvalidVariant = variants.some(
    (variant) =>
      !variant.color ||
      !variant.colorName ||
      !variant.image ||
      !variant.size ||
      variant.stock < 0
  );

  if (hasInvalidVariant) {
    throw new AppError("Invalid variant data", 400);
  }

  const hasInvalidColor = variants.some(
    (variant) => !/^#[0-9A-Fa-f]{6}$/.test(variant.color)
  );

  if (hasInvalidColor) {
    throw new AppError("Invalid color", 400);
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const product = await Product.create({
    title,
    categoryId,
    gender,
    price,
    variants,
  });

  return product;
}