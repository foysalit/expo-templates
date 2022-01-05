import pick from "lodash.pick";
import React, { useEffect } from "react";
import { SectionList, Text, TouchableOpacity, View } from "react-native";
import tailwind from "tailwind-rn";
import { useTranslation } from "react-i18next";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OrderListState, useOrderListStore } from "./list.store";
import { getCategoryCountFromItems, groupOrderListByDate } from "./data";
import { ListEmptyComponent } from "../shared/list-empty.component";
import { HeaderComponent } from "../shared/header.component";
import { getDisplayablePrice } from "../shared/helpers";
import { OrderStackParamList } from "../shared/types";

const getList = (state: OrderListState) => pick(state, ["list", "isLoading", "load"]);

export const OrderListScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<OrderStackParamList>>();
  const { load, list, isLoading } = useOrderListStore(getList);

  useEffect(() => {
    load();
  }, [load]);

  const ordersGroupedByDay = groupOrderListByDate(list);
  return (
    <SectionList
      refreshing={isLoading}
      sections={ordersGroupedByDay}
      contentContainerStyle={tailwind("flex-grow")}
      keyExtractor={(item, index) => `orders_${item}_${index}`}
      ListEmptyComponent={
        <ListEmptyComponent
          title={t("order.list.page.emptyTitle")}
          description={t("order.list.page.emptyDescription")}
          Icon={<MaterialCommunityIcons name="cart-off" size={30} />}
        />
      }
      ListHeaderComponent={
        <View style={tailwind("px-2")}>
          <HeaderComponent text={t("order.list.page.header")} />
        </View>
      }
      renderSectionHeader={({ section: { title, data } }) => (
        <View
          style={tailwind(
            "bg-gray-200 ml-4 mb-2 px-2 py-1 rounded-l flex flex-row justify-between",
          )}
        >
          <Text style={tailwind("font-semibold")}>{title}</Text>
          <Text style={tailwind("text-xs")}>{t("order.day.count", { count: data.length })}</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tailwind("pl-4 pr-2 mb-2")}
          onPress={() => navigation.navigate("OrderDetailsScreen", { order: item })}
        >
          <View style={tailwind("flex")}>
            <View style={tailwind("w-full flex flex-row justify-between")}>
              <Text style={tailwind("text-lg")}>{t("order.title", { id: item.id })}</Text>
              <Text style={tailwind("font-semibold")}>{getDisplayablePrice(item.total)}</Text>
            </View>
            <Text>
              {t("order.summary", {
                itemCount: item.order_items.length,
                categoryCount: getCategoryCountFromItems(item.order_items),
              })}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};
