import connectDB from "@/lib/db/connect";
import Category from "@/lib/db/models/Category";
import { AppError } from "@/lib/AppError";

export async function updateCategory(id: string, title: string, iconUrl: string) {
  await connectDB();

  const category = await Category.findById(id);
  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const duplicate = await Category.findOne({ title, _id: { $ne: id } });
  if (duplicate) {
    throw new AppError("Category with this title already exists", 400);
  }

  category.title = title;
  category.iconUrl = iconUrl;
  await category.save();

  return category;
}
