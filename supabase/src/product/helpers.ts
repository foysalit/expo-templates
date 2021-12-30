import { CategoryWithOrderProduct, Product } from "./types";

export const getInCartQty = (product: Product, cartItems: CategoryWithOrderProduct[]): number => {
  let qty = 0;
  cartItems.forEach(item => {
    const itemInCart = item.products.find(prod => prod.id === product.id);
    if (itemInCart) qty = itemInCart.qty;
  });

  return qty;
};
