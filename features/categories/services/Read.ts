import connectDB from "@/lib/db/connect";
import Category from "@/lib/db/models/Category";
import Product from "@/lib/db/models/Product";

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


export async function getCategoriesWithProducts() {
  await connectDB();

  const categoryIds = await Product.distinct("categoryId");

  const categories = await Category.find({
    _id: { $in: categoryIds },
  });

  return categories;
}