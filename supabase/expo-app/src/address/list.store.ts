import create from "zustand";
import { Address } from "./types";
import { getAddresses, removeAddress } from "./data";

export type AddressListState = {
  list: Address[];
  isLoading: boolean;

  load: () => Promise<void>;
  update: (address: Address) => void;
  remove: (id: Address["id"]) => Promise<void>;
};

export const useAddressListStore = create<AddressListState>(set => ({
  list: [],
  isLoading: true,

  load: async () => {
    set({ isLoading: true });
    const list = await getAddresses();
    set({ list, isLoading: false });
  },

  update: address => {
    set(state => {
      const newList = [...state.list];
      const existingAddressIndex = newList.findIndex(a => a.id === address.id);
      if (existingAddressIndex >= 0) newList[existingAddressIndex] = address;
      else newList.push(address);
      return { list: newList };
    });
  },

  remove: async id => {
    set({ isLoading: true });
    await removeAddress(id);
    set(state => ({ isLoading: false, list: state.list.filter(address => address.id !== id) }));
  },
}));
