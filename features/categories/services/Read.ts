import connectDB from "@/lib/db/connect";
import Category from "@/lib/db/models/Category";

export async function getCategories() {
  await connectDB();

  const categories = await Category.find({}).sort({ createdAt: -1 });

  return categories;
}
