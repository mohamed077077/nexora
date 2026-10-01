import connectDB from "@/lib/db/connect";
import Color from "@/lib/db/models/Color";

export async function getColors() {
  await connectDB();
  const colors = await Color.find({}).sort({ createdAt: -1 });
  return colors;
}

