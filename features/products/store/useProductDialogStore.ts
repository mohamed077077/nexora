import { create } from "zustand";
import type { Product } from "../types";

export type ProductDialogState =
  | { type: "add-product" }
  | { type: "edit-product"; product: Product }
  | { type: "delete-product"; product: Product }
  | null;

type ProductDialogStore = {
  dialog: ProductDialogState;

  openAddProduct: () => void;
  openEditProduct: (product: Product) => void;
  openDeleteProduct: (product: Product) => void;

  close: () => void;
};

export const useProductDialogStore = create<ProductDialogStore>((set) => ({
  dialog: null,

  openAddProduct: () => {
    set({
      dialog: { type: "add-product" },
    });
  },

  openEditProduct: (product) => {
    set({
      dialog: { type: "edit-product", product },
    });
  },

  openDeleteProduct: (product) => {
    set({
      dialog: { type: "delete-product", product },
    });
  },

  close: () => {
    set({
      dialog: null,
    });
  },
}));
