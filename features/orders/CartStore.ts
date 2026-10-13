import { create } from "zustand";
import type { Product, Variant } from "@/features/products/types";
import type { CartItem } from "./types";

type CartState = {
  items: CartItem[];

  addItem: (product: Product, variant: Variant) => void;
  removeItem: (productId: string, variant: Variant) => void;
  clearCart: () => void;
};


function cartItemKey(productId: string, variant: Variant): string {
  return JSON.stringify([productId, variant.color, variant.size]);
}


export const selectTotalItems = (state: CartState): number =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const useCartStore = create<CartState>()((set) => ({
  items: [],

  addItem: (product, variant) => {
    const key = cartItemKey(product._id, variant);

    set((state) => {
      const existingItem = state.items.find(
        (item) => cartItemKey(item.productId, item.variant) === key,
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            cartItemKey(item.productId, item.variant) === key
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            productId: product._id,
            product,
            variant,
            quantity: 1,
          },
        ],
      };
    });
  },

  removeItem: (productId, variant) => {
    const key = cartItemKey(productId, variant);

    set((state) => ({
      items: state.items.filter(
        (item) => cartItemKey(item.productId, item.variant) !== key,
      ),
    }));
  },

  clearCart: () => set({ items: [] }),
}));