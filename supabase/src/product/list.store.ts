import create from "zustand";
import { CategoryWithProducts } from "./types";
import { getCategoriesWithProducts } from "./data";

export type ProductListState = {
  categorizedList: CategoryWithProducts[];
  isLoading: boolean;
  load: () => void;
};

export const useProductListStore = create<ProductListState>((set, get) => ({
  categorizedList: [],
  isLoading: false,
  load: () => {
    // if already loaded, don't reload
    if (get().categorizedList?.length) return;
    set({ isLoading: true });
    getCategoriesWithProducts()
      .then(categorizedList => {
        if (categorizedList?.length) set({ categorizedList });
      })
      .finally(() => set({ isLoading: false }));
  },
}));

export const getProductListLoader = (state: ProductListState) => state.load;
