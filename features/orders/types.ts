import type { Product, Variant } from "@/features/products/types";

export type CartItem = {
  productId: string;
  product: Product;
  variant: Variant;
  quantity: number;
};
