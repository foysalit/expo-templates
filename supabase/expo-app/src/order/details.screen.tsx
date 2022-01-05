import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import tailwind from "tailwind-rn";
import { OrderDetailsScreenProps } from "../shared/types";
import { HeaderComponent } from "../shared/header.component";
import { ProductItemComponent } from "../product/item.component";
import { getDisplayablePrice } from "../shared/helpers";
import { getCategoryCountFromItems } from "./data";
import { AddressItemComponent } from "../address/item.component";
import { TitleComponent } from "../shared/title.component";

export const OrderDetailsScreen = ({ route }: OrderDetailsScreenProps) => {
  const { order } = route.params;
  const { t } = useTranslation();

  return (
    <ScrollView>
      <HeaderComponent text={t("order.title", { id: order.id })}>
        <Text>{getDisplayablePrice(order.total)}</Text>
      </HeaderComponent>
      <View style={tailwind("bg-gray-200 rounded p-4 mx-4 mb-3")}>
        <Text style={tailwind("font-semibold")}>{t("order.detail.page.summaryLabel")}</Text>
        <Text style={tailwind("mb-2")}>
          {t("order.summary", {
            itemCount: order.order_items.length,
            categoryCount: getCategoryCountFromItems(order.order_items),
          })}
        </Text>
        <Text style={tailwind("font-semibold")}>{t("order.detail.page.addressLabel")}</Text>
        <AddressItemComponent address={order.address} isLast isSelected={false} />
      </View>
      <View style={tailwind("mx-4")}>
        <TitleComponent type="section" text={t("order.detail.page.itemsLabel")} />
      </View>
      {order.order_items.map(({ products, qty }) => (
        <ProductItemComponent product={products} inCartQty={qty} />
      ))}
    </ScrollView>
  );
};
