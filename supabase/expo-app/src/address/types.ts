export type Address = {
  id: number;
  created_at: string;
  user_id: string;
  line_one: string;
  line_two: string;
  city: string;
  post_code: string;
  country: string;
  is_default: boolean;
};

export type AddressListComponentProps = {
  onPress: (address: Address) => void;
  selected: Address | null;
};

export type AddressItemComponentProps = {
  address: Address;
  isLast: boolean;
  isSelected: boolean;
};
