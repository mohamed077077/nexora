import { AppError } from "@/lib/AppError";
import connectDB from "@/lib/db/connect";
import Color from "@/lib/db/models/Color";

export async function createColor(title: string, iconUrl: string) {
  await connectDB();

  const existingColor = await Color.findOne({ title });
  if (existingColor) {
    throw new AppError("Color with this title already exists", 400);
  }

  return Color.create({ title, iconUrl });
}
