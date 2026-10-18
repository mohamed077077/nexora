import { create } from "zustand";
import { Order } from "../types";

type OrderDialogState = {
  isOpen: boolean;
  order: Order | null;
  openDialog: (order: Order) => void;
  closeDialog: () => void;
};

export const useOrderDialogStore = create<OrderDialogState>()((set) => ({
  isOpen: false,
  order: null,
  openDialog: (order) => set({ order, isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}));