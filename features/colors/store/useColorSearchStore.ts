import { create } from "zustand";

type ColorSearchStore = {
  search: string;
  setSearch: (value: string) => void;
};

export const useColorSearchStore = create<ColorSearchStore>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));
