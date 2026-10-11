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

const GENDER_LABELS: Record<string, { title: string; emoji: string }> = {
  all: { title: "All", emoji: "👥" },
  men: { title: "Men", emoji: "👨" },
  women: { title: "Women", emoji: "👩" },
  boys: { title: "Boys", emoji: "👦" },
  girls: { title: "Girls", emoji: "👧" },
};

function emojiIcon(emoji: string) {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
      <text x="50%" y="50%" font-size="24"
        text-anchor="middle" dominant-baseline="central">${emoji}</text>
    </svg>
  `)}`;
}

export function getProductGenders(products: Product[]) {
  const genderSet = new Set<string>();

  for (const product of products) {
    if (product.gender) {
      genderSet.add(product.gender);
    }
  }

  return Array.from(genderSet)
    .filter((g) => g in GENDER_LABELS)
    .map((g) => ({
      _id: g,
      title: GENDER_LABELS[g].title,
      iconUrl: emojiIcon(GENDER_LABELS[g].emoji),
    }));
}