import { create } from "zustand";
import type { Category } from "../types";

type CategoryDialogState =
  | { type: "add" }
  | { type: "edit"; category: Category }
  | { type: "delete"; category: Category }
  | null;

type CategoryDialogStore = {
  dialog: CategoryDialogState;

  openAdd: () => void;
  openEdit: (category: Category) => void;
  openDelete: (category: Category) => void;
  close: () => void;
};

export const useCategoryDialogStore =
  create<CategoryDialogStore>((set) => ({
    dialog: null,

    openAdd: () => {
      set({
        dialog: {
          type: "add",
        },
      });
    },

    openEdit: (category) => {
      set({
        dialog: {
          type: "edit",
          category,
        },
      });
    },

    openDelete: (category) => {
      set({
        dialog: {
          type: "delete",
          category,
        },
      });
    },

    close: () => {
      set({
        dialog: null,
      });
    },
  }));