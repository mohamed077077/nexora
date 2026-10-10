import { create } from "zustand";

type ColorState = {
  color: string;
  colorName: string;
  isCustomDialogOpen: boolean;

  setColor: (color: string) => void;
  setColorName: (colorName: string) => void;
  setColorDetails: (color: string, colorName: string) => void;

  openCustomDialog: () => void;
  closeCustomDialog: () => void;
  resetColorState: () => void;
};

export const useColorStore = create<ColorState>((set) => ({
  color: "",
  colorName: "",
  isCustomDialogOpen: false,

  setColor: (color) => set({ color }),

  setColorName: (colorName) => set({ colorName }),

  setColorDetails: (color, colorName) =>
    set({ color, colorName }),

  openCustomDialog: () => set({ isCustomDialogOpen: true }),

  closeCustomDialog: () => set({ isCustomDialogOpen: false }),

  resetColorState: () =>
    set({
      color: "",
      colorName: "",
      isCustomDialogOpen: false,
    }),
}));