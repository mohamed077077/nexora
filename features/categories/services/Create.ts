import connectDB from "@/lib/db/connect";
import Category from "@/lib/db/models/Category";
import { AppError } from "@/lib/AppError";

export async function createCategory(title: string, iconUrl: string) {
  await connectDB();

  const existingCategory = await Category.findOne({ title });
  if (existingCategory) {
    throw new AppError("Category with this title already exists", 400);
  }

  const category = await Category.create({ title, iconUrl });

  return category;
}
