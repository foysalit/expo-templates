import { CategoryWithOrderProduct, Product } from "./types";

export const getInCartQty = (product: Product, cartItems: CategoryWithOrderProduct[]): number => {
  let qty = 0;
  cartItems.forEach(item => {
    const itemInCart = item.products.find(prod => prod.id === product.id);
    if (itemInCart) qty = itemInCart.qty;
  });

  return qty;
};

export const getInCartItemCount = (cartItems: CategoryWithOrderProduct[]): number => {
  return cartItems.reduce((acc, item) => {
    return acc + item.products.reduce((total, prod) => total + prod.qty, 0);
  }, 0);
};

export const getInCartItemTotal = (cartItems: CategoryWithOrderProduct[]): number => {
  return cartItems.reduce((acc, item) => {
    return acc + item.products.reduce((total, prod) => total + prod.total, 0);
  }, 0);
};
