import { toast } from "sonner";

import { useCartStore } from "@/features/orders/CartStore";
import type { Product, Variant } from "@/features/products/types";

export function handleAddToCart(
  product: Product,
  variant: Variant,
) {
  try {
    const { addItem } = useCartStore.getState();

    addItem(product, variant);

    toast.success("Added to cart successfully!", {
      duration: 2500,
    });
  } catch (error) {
    console.error("Failed to add item to cart:", error);

    toast.error("Failed to add product to cart.", {
      description: "Please try again.",
      duration: 4000,
    });
  }
}