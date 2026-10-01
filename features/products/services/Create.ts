import mongoose from "mongoose";

import { AppError } from "@/lib/AppError";
import connectDB from "@/lib/db/connect";

import Category from "@/lib/db/models/Category";
import Color from "@/lib/db/models/Color";
import Product from "@/lib/db/models/Product";


export async function createProduct({
  title,
  categoryId,
  price,
  variants,
}: {
  title: string;
  categoryId: string;
  price: number;
  variants: {
    colorId: string;
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
    throw new AppError("Product must have at least one variant", 400);
  }

  const invalidColorId = variants.find(
    (variant) => !mongoose.isValidObjectId(variant.colorId)
  );

  if (invalidColorId) {
    throw new AppError("Invalid color ID", 400);
  }

  const colorIds = [...new Set(variants.map((variant) => variant.colorId))];

  const [category, colors] = await Promise.all([
    Category.findById(categoryId),
    Color.find({
      _id: { $in: colorIds },
    }),
  ]);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  if (colors.length !== colorIds.length) {
    throw new AppError("One or more colors not found", 404);
  }

  const product = await Product.create({
    title,
    categoryId,
    price,
    variants,
  });

  return product;
}