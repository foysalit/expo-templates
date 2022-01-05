import create from "zustand";
import { CategoryWithOrderProduct, PaymentIntent } from "./types";
import { createOrder, createPaymentIntentForOrder } from "../order/data";
import { getInCartItemTotal } from "./helpers";
import { OrderWithItems } from "../order/types";
import { Address } from "../address/types";

export type CartState = {
  deliveryAddress: Address | null;
  items: CategoryWithOrderProduct[];
  paymentIntent: PaymentIntent | null;

  clear: () => void;
  remove: (productId: number) => void;
  add: (item: CategoryWithOrderProduct) => void;
  setPaymentIntent: (userId: string) => void;
  setDeliveryAddress: (deliveryAddress: Address | null) => void;
  createOrder: (userId: string) => Promise<OrderWithItems | null>;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  paymentIntent: null,
  deliveryAddress: null,

  add: item => {
    const { items } = get();
    // if no other product from this category has been placed in cart yet
    // first create the category container and add the product to it
    // otherwise, find if the product exists in the category container and
    // add it if it doesn't. If it does, replace it with the incoming product
    let categoryExists = false;
    const newItems = items.map(category => {
      if (category.id === item.id) {
        categoryExists = true;
        const productIndex = category.products.findIndex(
          product => product.id === item.products[0].id,
        );
        if (productIndex >= 0) {
          // eslint-disable-next-line prefer-destructuring
          category.products[productIndex] = item.products[0];
        } else {
          category.products.push(item.products[0]);
        }
      }

      return category;
    });

    if (!categoryExists) {
      newItems.push(item);
    }

    set({ items: newItems });
  },
  remove: productId => {
    const { items } = get();
    let isRemoved = false;
    const newItems = items
      .map(category => {
        const productIndex = category.products.findIndex(product => product.id === productId);
        if (productIndex >= 0) {
          category.products.splice(productIndex, 1);
          isRemoved = true;
        }

        // If the removed product is the last one of its category, remove the category too
        if (category.products.length < 1) return null;

        return category;
      })
      .filter(Boolean) as CategoryWithOrderProduct[];

    // Doubt there will ever be a case where the product does not exist in the cart
    // and is being removed but this feels safer somehow
    if (isRemoved) set({ items: newItems });
  },

  clear: () => set({ items: [] }),

  setDeliveryAddress: deliveryAddress => set({ deliveryAddress }),

  setPaymentIntent: async (userId: string) => {
    const { items, paymentIntent } = get();
    if (paymentIntent) return;
    const total = getInCartItemTotal(items);
    const newIntent = await createPaymentIntentForOrder(total, userId);
    if (newIntent) set({ paymentIntent: newIntent });
  },

  createOrder: async (userId: string): Promise<OrderWithItems | null> => {
    const { paymentIntent, items, deliveryAddress } = get();
    if (!paymentIntent || !items.length) return null;
    const total = getInCartItemTotal(items);
    const orderWithItems = await createOrder({
      total,
      user_id: userId,
      categoryWithProducts: items,
      address_id: deliveryAddress?.id,
      payment_intent_id: paymentIntent.id,
    });
    set({ items: [], paymentIntent: null });
    return orderWithItems;
  },
}));
