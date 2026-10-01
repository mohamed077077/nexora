import connectDB from "@/lib/db/connect";

import Category from "@/lib/db/models/Category";
import Product from "@/lib/db/models/Product";

import { AppError } from "@/lib/AppError";

export async function deleteCategory(id: string) {
  await connectDB();

  const category = await Category.findById(id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const productExists = await Product.exists({
    categoryId: id,
  });

  if (productExists) {
    throw new AppError(
      "This category cannot be deleted while it is assigned to products",
      409
    );
  }

  await category.deleteOne();

  return category;
}