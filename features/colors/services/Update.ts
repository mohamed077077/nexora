import { AppError } from "@/lib/AppError";
import connectDB from "@/lib/db/connect";
import Color from "@/lib/db/models/Color";

export async function updateColor(id: string, title: string, iconUrl: string) {
  await connectDB();

  const color = await Color.findById(id);
  if (!color) {
    throw new AppError("Color not found", 404);
  }

  const duplicate = await Color.findOne({ title, _id: { $ne: id } });
  if (duplicate) {
    throw new AppError("Color with this title already exists", 400);
  }

  color.title = title;
  color.iconUrl = iconUrl;
  await color.save();
  return color;
}
