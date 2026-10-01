import { AppError } from "@/lib/AppError";

import connectDB from "@/lib/db/connect";

import Color from "@/lib/db/models/Color";
import Product from "@/lib/db/models/Product";

export async function deleteColor(id: string) {
  await connectDB();

  const color = await Color.findById(id);

  if (!color) {
    throw new AppError("Color not found", 404);
  }

  const productExists = await Product.exists({
    "variants.colorId": id,
  });

  if (productExists) {
    throw new AppError(
      "This color cannot be deleted while it is assigned to product variants",
      409
    );
  }

  await color.deleteOne();

  return color;
}