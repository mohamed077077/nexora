import { create } from "zustand";

type ProductFilterStore = {
  search: string;
  category: string;
  color: string;
  price: string;
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  setColor: (value: string) => void;
  setPrice: (value: string) => void;
  clearFilters: () => void;
};

export const useProductFilterStore = create<ProductFilterStore>((set) => ({
  search: "",
  category: "all",
  color: "all",
  price: "all",

  setSearch: (value) => set({ search: value }),
  setCategory: (value) => set({ category: value }),
  setColor: (value) => set({ color: value }),
  setPrice: (value) => set({ price: value }),

  clearFilters: () =>
    set({
      search: "",
      category: "all",
      color: "all",
      price: "all",
    }),
}));

