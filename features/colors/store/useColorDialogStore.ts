import { create } from "zustand";
import type { Color } from "../types";

type ColorDialogState =
  | { type: "add" }
  | { type: "edit"; color: Color }
  | { type: "delete"; color: Color }
  | null;

type ColorDialogStore = {
  dialog: ColorDialogState;
  openAdd: () => void;
  openEdit: (color: Color) => void;
  openDelete: (color: Color) => void;
  close: () => void;
};

export const useColorDialogStore = create<ColorDialogStore>((set) => ({
  dialog: null,
  openAdd: () => set({ dialog: { type: "add" } }),
  openEdit: (color) => set({ dialog: { type: "edit", color } }),
  openDelete: (color) => set({ dialog: { type: "delete", color } }),
  close: () => set({ dialog: null }),
}));
