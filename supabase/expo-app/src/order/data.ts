import { API_URL } from "@env";
import format from "date-fns/format";

import { supabase } from "../supabase";
import { PaymentIntent } from "../product/types";
import {
  CreateOrderData,
  OrderWithItems,
  Order,
  OrderItem,
  OrderWithItemsGroupedByDay,
} from "./types";

export const createPaymentIntentForOrder = async (
  amount: number,
  userId: string,
): Promise<PaymentIntent> => {
  const response = await fetch(`${API_URL}/payment-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, userId }),
  });
  const data = await response.json();
  return data;
};

export const getOrderList = async (): Promise<OrderWithItems[]> => {
  const { data: orderWithItems } = await supabase
    .from<OrderWithItems>("orders")
    .select("*, address(*), order_items(*, products(*))");

  if (!orderWithItems?.length) return [];

  return orderWithItems;
};

export const getOrder = async (id: number): Promise<OrderWithItems | null> => {
  const { data: orderWithItems } = await supabase
    .from<OrderWithItems>("orders")
    .select("*, address(*), order_items(*, products(*))")
    .eq("id", id);

  if (!orderWithItems?.length) return null;

  return orderWithItems[0];
};

export const createOrder = async ({
  total,
  user_id,
  address_id,
  payment_intent_id,
  categoryWithProducts,
}: CreateOrderData): Promise<OrderWithItems | null> => {
  const { data: orders, error } = await supabase.from<Order>("orders").insert([
    {
      total,
      user_id,
      address_id,
      payment_intent_id,
    },
  ]);

  if (!orders?.length) throw error;
  const orderItems = categoryWithProducts
    .map(({ products }) => {
      return products.map(({ id, qty, unit_price }) => ({
        order_id: orders[0].id,
        product_id: id,
        unit_price,
        qty,
      }));
    })
    .flat();

  const { data: orderItemsData, error: orderItemsError } = await supabase
    .from<OrderItem>("order_items")
    .insert(orderItems);

  if (!orderItemsData?.length) throw orderItemsError;

  return getOrder(orders[0].id);
};

export const groupOrderListByDate = (orders: OrderWithItems[]): OrderWithItemsGroupedByDay[] => {
  const groupedOrders: { [key: string]: OrderWithItemsGroupedByDay } = {};
  const dayFormat = "MMM d, yyyy";

  orders.forEach(orderWithItems => {
    const title = format(new Date(orderWithItems.created_at), dayFormat);
    if (groupedOrders[title]) {
      groupedOrders[title].data.push(orderWithItems);
    } else {
      groupedOrders[title] = {
        title,
        data: [orderWithItems],
      };
    }
  });

  return Object.values(groupedOrders);
};

export const getCategoryCountFromItems = (orderItems: OrderItem[]): number => {
  return orderItems.reduce((acc, item) => {
    if (!acc.includes(item.products.category_id)) {
      acc.push(item.products.category_id);
    }
    return acc;
  }, [] as number[]).length;
};
