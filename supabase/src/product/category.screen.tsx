import React from "react";
import pick from "lodash.pick";
import tailwind from "tailwind-rn";
import { FlatList, View } from "react-native";

import { CategoryScreenProps } from "../shared/types";
import { ProductItemComponent } from "./item.component";
import { useCartStore } from "./cart.store";
import { getInCartQty } from "./helpers";
import { CartIconComponent } from "./cart-icon.component";
import { HeaderComponent } from "../shared/header.component";

export const CategoryScreen = ({ route }: CategoryScreenProps) => {
  const { categoryWithProducts } = route.params;
  const { items, add, remove } = useCartStore(state => pick(state, ["items", "add", "remove"]));
  return (
    <View style={tailwind("flex flex-1")}>
      <FlatList
        data={categoryWithProducts.products}
        keyExtractor={product => `product_${product.id}`}
        ListHeaderComponent={
          <View style={tailwind("px-2")}>
            <HeaderComponent text={categoryWithProducts.title}>
              <CartIconComponent />
            </HeaderComponent>
          </View>
        }
        renderItem={entry => (
          <ProductItemComponent
            onAddToCart={qty =>
              add({
                ...categoryWithProducts,
                products: [{ ...entry.item, qty, total: qty * entry.item.unit_price }],
              })
            }
            onRemoveFromCart={() => remove(entry.item.id)}
            inCartQty={getInCartQty(entry.item, items)}
            product={entry.item}
          />
        )}
      />
    </View>
  );
};
