import connectDB from "@/lib/db/connect";
import Color from "@/lib/db/models/Color";

export async function getColors() {
  await connectDB();

  return Color.aggregate([
    {
      $lookup: {
        from: "productvariants",
        localField: "_id",
        foreignField: "colorId",
        as: "variants",
      },
    },
    { $addFields: { variantCount: { $size: "$variants" } } },
    { $project: { variants: 0 } },
    { $sort: { createdAt: -1 } },
  ]);
}
