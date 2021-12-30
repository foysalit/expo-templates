import React from "react";
import pick from "lodash.pick";
import tailwind from "tailwind-rn";
import { FlatList, View } from "react-native";

import { CategoryScreenProps } from "../shared/types";
import { ProductItemComponent } from "./item.component";
import { useCartStore } from "./cart.store";
import { getInCartQty } from "./helpers";
import { TitleComponent } from "../shared/title.component";

export const CategoryScreen = ({ route }: CategoryScreenProps) => {
  const { categoryWithProducts } = route.params;
  const { items, add, remove } = useCartStore(state => pick(state, ["items", "add", "remove"]));
  return (
    <View style={tailwind("flex flex-1")}>
      <FlatList
        data={categoryWithProducts.products}
        keyExtractor={product => `product_${product.id}`}
        ListHeaderComponent={
          <View style={tailwind("px-4 py-2")}>
            <TitleComponent text={categoryWithProducts.title} type="section" />
          </View>
        }
        renderItem={entry => (
          <ProductItemComponent
            onAddToCart={qty =>
              add({ ...categoryWithProducts, products: [{ ...entry.item, qty }] })
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
