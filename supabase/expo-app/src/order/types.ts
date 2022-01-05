import { CategoryWithOrderProduct, Product } from "../product/types";
import { Address } from "../address/types";

export type Order = {
  id: number;
  user_id: string;
  total: number;
  created_at: Date;
  address_id?: Address["id"];
  payment_intent_id: string;
};

export type OrderItem = {
  id: number;
  qty: number;
  order_id: number;
  product_id: number;
  unit_price: number;
  products: Product;
};

export type CreateOrderData = Pick<
  Order,
  "total" | "user_id" | "payment_intent_id" | "address_id"
> & {
  categoryWithProducts: CategoryWithOrderProduct[];
};

export type OrderWithItems = Order & { address: Address; order_items: OrderItem[] };

export type OrderWithItemsGroupedByDay = {
  title: string;
  data: OrderWithItems[];
};
