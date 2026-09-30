import { create } from "zustand";

type CategorySearchStore = {
  search: string;
  setSearch: (value: string) => void;
  clearSearch: () => void;
};

export const useCategorySearchStore =
  create<CategorySearchStore>((set) => ({
    search: "",

    setSearch: (value) => {
      set({ search: value });
    },

    clearSearch: () => {
      set({ search: "" });
    },
  }));