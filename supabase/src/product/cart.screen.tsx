import { SectionList, Text, View } from "react-native";
import tailwind from "tailwind-rn";
import React from "react";
import { useTranslation } from "react-i18next";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HeaderComponent } from "../shared/header.component";
import { ProductItemComponent } from "./item.component";
import { getInCartItemTotal, getInCartQty } from "./helpers";
import { useCartStore } from "./cart.store";
import { ButtonComponent } from "../shared/button.component";
import { getDisplayablePrice } from "../shared/helpers";

export const CartScreen = () => {
  const { items, add, remove } = useCartStore();
  const { t } = useTranslation();
  const sectionedItems =
    items.length > 0
      ? items.map(categoryWithProducts => ({
          ...categoryWithProducts,
          data: categoryWithProducts.products,
        }))
      : [];
  const cartTotal = getInCartItemTotal(items);
  const isEmpty = sectionedItems.length === 0;
  return (
    <SectionList
      sections={sectionedItems}
      contentContainerStyle={tailwind("flex-grow")}
      keyExtractor={(item, index) => `cart_items_${item}_${index}`}
      ListHeaderComponent={
        <View style={tailwind("px-2")}>
          <HeaderComponent text={t("cart.page.header")}>
            <ButtonComponent
              text={getDisplayablePrice(cartTotal)}
              onPress={() => isEmpty}
              layout="right"
            />
          </HeaderComponent>
        </View>
      }
      ListEmptyComponent={() => (
        <View style={tailwind("px-2 flex flex-grow items-center justify-center")}>
          <MaterialCommunityIcons name="cart-off" size={30} />
          <Text style={tailwind("text-center text-gray-700 font-semibold")}>
            {t("cart.page.emptyTitle")}
          </Text>
          <Text style={tailwind("text-center text-gray-500")}>
            {t("cart.page.emptyDescription")}
          </Text>
        </View>
      )}
      ListFooterComponent={
        !isEmpty ? (
          <View style={tailwind("px-2")}>
            <ButtonComponent text={t("cart.order.button")} onPress={() => null} layout="block" />
          </View>
        ) : null
      }
      renderSectionHeader={({ section: { title, data } }) => (
        <View
          style={tailwind(
            "bg-gray-200 ml-4 mb-2 px-2 py-1 rounded-l flex flex-row justify-between",
          )}
        >
          <Text style={tailwind("font-semibold")}>{title}</Text>
          <Text style={tailwind("text-xs")}>
            {t("category.products.count", { count: data.length })}
          </Text>
        </View>
      )}
      renderItem={({ item, section }) => (
        <ProductItemComponent
          onAddToCart={qty => add({ ...section, products: [{ ...item, qty }] })}
          onRemoveFromCart={() => remove(item.id)}
          inCartQty={getInCartQty(item, items)}
          product={item}
        />
      )}
    />
  );
};
