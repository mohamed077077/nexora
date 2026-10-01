import connectDB from "@/lib/db/connect";

import Color from "@/lib/db/models/Color";
import Product from "@/lib/db/models/Product";

export async function getColors() {
  await connectDB();

  const [colors, productCounts] = await Promise.all([
    Color.find({}).sort({ createdAt: -1 }),

    Product.aggregate([
      {
        $unwind: "$variants",
      },
      {
        $group: {
          _id: "$variants.colorId",
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  const countMap = new Map(
    productCounts.map((item) => [
      item._id.toString(),
      item.count,
    ])
  );

  return colors.map((color) => ({
    ...color.toObject(),
    productCount: countMap.get(color._id.toString()) ?? 0,
  }));
}


export async function getColorsWithProducts() {
  await connectDB();

  const colorIds = await Product.distinct("variants.colorId");

  const colors = await Color.find({
    _id: { $in: colorIds },
  });

  return colors;
}