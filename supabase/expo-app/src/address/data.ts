import { supabase } from "../supabase";
import { Address } from "./types";

export const getAddresses = async (): Promise<Address[]> => {
  const { data } = await supabase.from<Address>("address").select("*");
  return data || [];
};

export const saveAddress = async (address: Partial<Address>): Promise<Address | null> => {
  const addresses = supabase.from<Address>("address");
  const { data, error } = address.id
    ? await addresses.update(address).match({ id: address.id })
    : await addresses.insert(address);

  if (error && !data) throw error;

  return data ? data[0] : data;
};

export const removeAddress = async (id: Address["id"]): Promise<boolean> => {
  const { data, error } = await supabase.from<Address>("address").delete().match({ id });
  if (error && !data) throw error;

  return true;
};
