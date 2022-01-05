export type Product = {
  id: number;
  title: string;
  description: string;
  unit_size: string;
  unit_price: number;
  picture: string;
  category_id: number;
  created_at: string;
  updated_at: string;
};

export type OrderProduct = Product & {
  qty: number;
  total: number;
};

export type Category = {
  id: number;
  title: string;
  picture: string;
  description: string;
};

export type CategoryWithProducts = Category & {
  products: Product[];
};

export type CategoryWithOrderProduct = Category & {
  products: OrderProduct[];
};

export type PaymentIntent = {
  client_secret: string;
  id: string;
};

export type ProductItemComponentProps = {
  product: Product;
  inCartQty: number;
  onRemoveFromCart?: () => void;
  onAddToCart?: (qty: number) => void;
  onPress?: (product: Product) => void;
};
