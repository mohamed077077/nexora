import type { Product } from "@/features/products/types";
import type { Category } from "@/features/categories/types";

type ProductFilters = {
  color?: string;
  category?: string;
  gender?: string;
};

type FilterKey = keyof ProductFilters;

const normalize = (value?: string | null) =>
  value?.trim().toLowerCase() ?? "";

function isActiveFilter(value?: string) {
  const normalized = normalize(value);

  return normalized !== "" && normalized !== "all";
}

function matchesColor(product: Product, color?: string) {
  if (!isActiveFilter(color)) return true;

  return (product.variants ?? []).some(
    (variant) => normalize(variant.color) === normalize(color),
  );
}

function matchesCategory(product: Product, category?: string) {
  if (!isActiveFilter(category)) return true;

  return normalize(product.categoryId) === normalize(category);
}

function matchesGender(product: Product, gender?: string) {
  if (!isActiveFilter(gender)) return true;

  return normalize(product.gender) === normalize(gender);
}

export function getMatchingProducts(
  products: Product[],
  filters: ProductFilters,
  ignoredFilter?: FilterKey,
) {
  return products.filter((product) => {
    const colorMatches =
      ignoredFilter === "color" ||
      matchesColor(product, filters.color);

    const categoryMatches =
      ignoredFilter === "category" ||
      matchesCategory(product, filters.category);

    const genderMatches =
      ignoredFilter === "gender" ||
      matchesGender(product, filters.gender);

    return colorMatches && categoryMatches && genderMatches;
  });
}

const GENDER_LABELS: Record<
  string,
  { title: string; emoji: string }
> = {
  men: {
    title: "Men",
    emoji: "👨",
  },
  women: {
    title: "Women",
    emoji: "👩",
  },
  boys: {
    title: "Boys",
    emoji: "👦",
  },
  girls: {
    title: "Girls",
    emoji: "👧",
  },
};

function emojiIcon(emoji: string): string {
  const svg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <text
        x="16"
        y="16"
        font-size="24"
        text-anchor="middle"
        dominant-baseline="central"
      >${emoji}</text>
    </svg>
  `;

  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
}



export function getCategories(
  products: Product[],
  categories: Category[],
  filters: ProductFilters = {},
) {
  const matchingProducts = getMatchingProducts(
    products,
    filters,
    "category",
  );

  return categories
    .filter((category) =>
      matchingProducts.some(
        (product) =>
          normalize(product.categoryId) ===
          normalize(category._id),
      ),
    )
    .sort((a, b) => b.productCount - a.productCount);
}

export function getGenders(
  products: Product[],
  filters: ProductFilters = {},
) {
  const matchingProducts = getMatchingProducts(
    products,
    filters,
    "gender",
  );

  return matchingProducts
    .map((product) => normalize(product.gender))
    .filter(
      (gender, index, genders) =>
        Boolean(gender) &&
        gender in GENDER_LABELS &&
        genders.indexOf(gender) === index,
    )
    .map((gender) => ({
      _id: gender,
      title: GENDER_LABELS[gender].title,
      iconUrl: emojiIcon(GENDER_LABELS[gender].emoji),
    }));
}

export function getColors(
  products: Product[],
  filters: ProductFilters = {},
) {
  // 1. Get products matching the other filters
  const matchingProducts = getMatchingProducts(
    products,
    filters,
    "color",
  );

  // 2. Create an empty list of colors
  const colors: {
    _id: string;
    title: string;
    count: number;
  }[] = [];

  // 3. Loop through the products
  for (const product of matchingProducts) {
    // 4. Loop through each product's variants
    for (const variant of product.variants ?? []) {
      const rawColor = variant.color?.trim();


      const hex = normalize(rawColor);

      // 6. Check whether this color already exists
      const existingColor = colors.find(
        (color) => color._id === hex,
      );

      // 7. If it exists, increase its count
      if (existingColor) {
        existingColor.count++;
      } else {
        // 8. Otherwise, add it to the list
        colors.push({
          _id: hex,
          title: variant.colorName?.trim() || rawColor,
          count: 1,
        });
      }
    }
  }

  // 9. Sort from most common to least common
  return colors.sort((a, b) => b.count - a.count);
}


export const formatOrderId = (id: string) => `#ORD-${id.slice(-6).toUpperCase()}`;