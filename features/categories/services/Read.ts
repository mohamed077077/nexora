import connectDB from "@/lib/db/connect";

import Category from "@/lib/db/models/Category";

export async function getCategories() {
  await connectDB();

  const categories = await Category.aggregate([
    {
      $lookup: {
        from: "products",
        let: { categoryId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$categoryId", "$$categoryId"],
              },
            },
          },
          {
            $count: "count",
          },
        ],
        as: "productCount",
      },
    },
    {
      $addFields: {
        productCount: {
          $ifNull: [
            { $arrayElemAt: ["$productCount.count", 0] },
            0,
          ],
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  return categories;
}