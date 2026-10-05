import { create } from "zustand";
import type { Variant } from "../types";

export type VariantDialogState =
  | { type: "add-variant" }
  | { type: "edit-variant"; variant: Variant; index: number }
  | { type: "delete-variant"; variant: Variant; index: number }
  | null;

type VariantDialogStore = {
  dialog: VariantDialogState;

  openAddVariant: () => void;
  openEditVariant: (variant: Variant, index: number) => void;
  openDeleteVariant: (variant: Variant, index: number) => void;

  close: () => void;
};

export const useVariantDialogStore = create<VariantDialogStore>((set) => ({
  dialog: null,

  openAddVariant: () => {
    set({
      dialog: { type: "add-variant" },
    });
  },

  openEditVariant: (variant, index) => {
    set({
      dialog: { type: "edit-variant", variant, index },
    });
  },

  openDeleteVariant: (variant, index) => {
    set({
      dialog: { type: "delete-variant", variant, index },
    });
  },

  close: () => {
    set({
      dialog: null,
    });
  },
}));
