import mongoose from "mongoose";

import { AppError } from "@/lib/AppError";
import connectDB from "@/lib/db/connect";

import Category from "@/lib/db/models/Category";
import Product from "@/lib/db/models/Product";

export async function updateProduct(
  id: string,
  {
    title,
    categoryId,
    price,
    gender,
    variants,
  }: {
    title: string;
    categoryId: string;
    price: number;
    gender: string;
    variants: {
      color: string;
      colorName: string;
      size: string | number;
      image: string;
      stock: number;
    }[];
  }
) {
  await connectDB();

  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Invalid product ID", 400);
  }

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

  const [product, category] = await Promise.all([
    Product.findById(id),
    Category.findById(categoryId),
  ]);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  product.title = title;
  product.categoryId = categoryId;
  product.gender = gender;
  product.price = price;
  product.variants = variants;

  await product.save();

  return product;
}