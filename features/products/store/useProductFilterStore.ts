import { create } from "zustand";

type ProductFilterStore = {
  search: string;
  category: string;
  color: string;
  gender: string;
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  setColor: (value: string) => void;
  setGender: (value: string) => void;
  clearFilters: () => void;
};

export const useProductFilterStore = create<ProductFilterStore>((set) => ({
  search: "",
  category: "all",
  color: "all",
  gender: "all",

  setSearch: (value) => set({ search: value }),
  setCategory: (value) => set({ category: value }),
  setColor: (value) => set({ color: value }),
  setGender: (value) => set({ gender: value }),

  clearFilters: () =>
    set({
      search: "",
      category: "all",
      color: "all",
      gender: "all",
    }),
}));
