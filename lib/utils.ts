import type { Product } from "@/features/products/types";
import type { Category } from "@/features/categories/types";

export function getProductColors(products: Product[]) {
  const colorMap = new Map<string, { _id: string; title: string; count: number }>();

  for (const product of products) {
    for (const variant of product.variants) {
      const existing = colorMap.get(variant.color);

      if (existing) {
        existing.count += 1;
      } else {
        colorMap.set(variant.color, {
          _id: variant.color,
          title: variant.colorName,
          count: 1,
        });
      }
    }
  }

  return Array.from(colorMap.values())
    .filter((color) => color.count > 0)
    .sort((a, b) => b.count - a.count);
}

export function sortCategoriesByProductCount(
  categories: Category[]
) {
  return [...categories].sort(
    (a, b) => b.productCount - a.productCount
  );
}