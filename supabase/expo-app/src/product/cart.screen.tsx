import { SectionList, Text, View } from "react-native";
import tailwind from "tailwind-rn";
import React, { useState, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BottomSheet from "@gorhom/bottom-sheet";

import { HeaderComponent } from "../shared/header.component";
import { ProductItemComponent } from "./item.component";
import { getInCartItemTotal, getInCartQty } from "./helpers";
import { useCartStore } from "./cart.store";
import { ButtonComponent } from "../shared/button.component";
import { getDisplayablePrice } from "../shared/helpers";
import { HomeStackParamList } from "../shared/types";
import { ListEmptyComponent } from "../shared/list-empty.component";
import { CategoryWithProducts } from "./types";
import { ProductDetailComponent } from "./detail.component";

const useCartScreen = () => {
  const { items, add, remove } = useCartStore();
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const sectionedItems =
    items.length > 0
      ? items.map(categoryWithProducts => ({
          ...categoryWithProducts,
          data: categoryWithProducts.products,
        }))
      : [];
  const cartTotal = getInCartItemTotal(items);
  const isEmpty = sectionedItems.length === 0;

  const openOrderConfirmScreen = () => navigation.navigate("OrderConfirmScreen");

  const [selectedProduct, setSelectedProduct] = useState<CategoryWithProducts>();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  const snapPoints = useMemo(() => ["50%"], []);
  const showProductDetail = (product: CategoryWithProducts) => {
    setSelectedProduct(product);
    bottomSheetRef.current?.expand();
  };

  return {
    t,
    sectionedItems,
    isEmpty,
    cartTotal,
    add,
    remove,
    items,
    openOrderConfirmScreen,
    bottomSheetRef,
    snapPoints,
    selectedProduct,
    showProductDetail,
  };
};

export const CartScreen = () => {
  const {
    t,
    sectionedItems,
    isEmpty,
    cartTotal,
    add,
    remove,
    items,
    openOrderConfirmScreen,
    bottomSheetRef,
    snapPoints,
    selectedProduct,
    showProductDetail,
  } = useCartScreen();
  return (
    <>
      <SectionList
        sections={sectionedItems}
        contentContainerStyle={tailwind("flex-grow")}
        keyExtractor={(item, index) => `cart_items_${item}_${index}`}
        ListHeaderComponent={
          <View style={tailwind("px-2")}>
            <HeaderComponent text={t("cart.page.header")}>
              <ButtonComponent
                onPress={() => !isEmpty && openOrderConfirmScreen()}
                text={getDisplayablePrice(cartTotal)}
                layout="right"
              />
            </HeaderComponent>
          </View>
        }
        ListEmptyComponent={() => (
          <ListEmptyComponent
            title={t("cart.page.emptyTitle")}
            description={t("cart.page.emptyDescription")}
            Icon={<MaterialCommunityIcons name="cart-off" size={30} />}
          />
        )}
        ListFooterComponent={
          !isEmpty ? (
            <View style={tailwind("px-2")}>
              <ButtonComponent
                layout="block"
                text={t("cart.order.button")}
                onPress={openOrderConfirmScreen}
              />
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
            onAddToCart={qty =>
              add({ ...section, products: [{ ...item, qty, total: item.unit_price * qty }] })
            }
            onRemoveFromCart={() => remove(item.id)}
            inCartQty={getInCartQty(item, items)}
            onPress={product => showProductDetail({ ...section, products: [product] })}
            {...item}
            product={item}
          />
        )}
      />
      <BottomSheet
        detached
        animateOnMount={false}
        enablePanDownToClose
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
      >
        <View style={tailwind("flex flex-1 items-center px-4")}>
          {selectedProduct && (
            <ProductDetailComponent
              product={selectedProduct.products[0]}
              onAddToCart={qty =>
                add({
                  ...selectedProduct,
                  products: [
                    {
                      ...selectedProduct.products[0],
                      qty,
                      total: selectedProduct.products[0].unit_price * qty,
                    },
                  ],
                })
              }
              inCartQty={getInCartQty(selectedProduct.products[0], items)}
            />
          )}
        </View>
      </BottomSheet>
    </>
  );
};
