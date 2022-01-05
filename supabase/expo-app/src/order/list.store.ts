import create from "zustand";
import { OrderWithItems } from "./types";
import { getOrderList } from "./data";

export type OrderListState = {
  list: OrderWithItems[];
  isLoading: boolean;

  load: () => Promise<void>;
};

export const useOrderListStore = create<OrderListState>(set => ({
  list: [],
  isLoading: true,
  load: async () => {
    set({ isLoading: true });
    const list = await getOrderList();
    set({ isLoading: false, list });
  },
}));
