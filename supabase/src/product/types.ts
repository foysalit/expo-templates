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
