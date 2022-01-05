import create from "zustand";
import { Address } from "./types";
import { saveAddress } from "./data";

export type AddressEditorState = {
  fields: Partial<Address>;
  isSaving: boolean;
  error: string;

  save: (address: Partial<Address>) => Promise<Address | null>;
};

const initialFields = {
  line_one: "",
  line_two: "",
  city: "",
  zip: "",
  country: "",
  is_default: false,
};

export const useAddressEditorStore = create<AddressEditorState>((set, get) => ({
  fields: initialFields,
  isSaving: false,
  error: "",

  save: async address => {
    set({ isSaving: true, fields: address });
    try {
      const newAddress = await saveAddress(address);
      set({ isSaving: false, fields: initialFields, error: "" });
      return newAddress;
    } catch (err) {
      set({ isSaving: false, error: err.message });
      return null;
    }
  },
}));
