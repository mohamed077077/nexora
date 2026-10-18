import { create } from "zustand";
import type { OrderStatus } from "../types";

export type OrderStatusFilter = OrderStatus | "all";

type OrderSearchStore = {
  search: string;
  status: OrderStatusFilter;
  setSearch: (value: string) => void;
  setStatus: (value: OrderStatusFilter) => void;
  clearSearch: () => void;
  clearFilters: () => void;
};

export const useOrderSearchStore = create<OrderSearchStore>((set) => ({
  search: "",
  status: "all",

  setSearch: (value) => {
    set({ search: value });
  },

  setStatus: (value) => {
    set({ status: value });
  },

  clearSearch: () => {
    set({ search: "" });
  },

  clearFilters: () => {
    set({ search: "", status: "all" });
  },
}));

export default useOrderSearchStore;
