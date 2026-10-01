import connectDB from "@/lib/db/connect";

import Product from "@/lib/db/models/Product";

export async function getProducts() {
  await connectDB();

  const products = await Product.find();

  return products;
}