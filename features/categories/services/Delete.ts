import connectDB from "@/lib/db/connect";
import Category from "@/lib/db/models/Category";
import { AppError } from "@/lib/AppError";

export async function deleteCategory(id: string) {
  await connectDB();

  const category = await Category.findById(id);
  if (!category) {
    throw new AppError("Category not found", 404);
  }

  await category.deleteOne();

  return category;
}
