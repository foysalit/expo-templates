import React from "react";
import pick from "lodash.pick";
import tailwind from "tailwind-rn";
import { TFunction, useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { HomeStackParamList } from "./types";
import { CategoryWithProducts } from "../product/types";
import { getProductListLoader, useProductListStore } from "../product/list.store";
import { HeaderComponent } from "./header.component";
import { CartIconComponent } from "../product/cart-icon.component";

const boxStyle = StyleSheet.create({
  shadowContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  imageOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});

const CategoryItem = ({
  categoryWithProducts,
  onPress,
  t,
}: {
  categoryWithProducts: CategoryWithProducts;
  t: TFunction<"translation">;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={[tailwind("w-1/2 px-2 mb-3")]} onPress={onPress}>
      <View style={[boxStyle.shadowContainer, tailwind("bg-gray-100 rounded-sm")]}>
        <Image
          source={{ uri: categoryWithProducts.picture }}
          style={{
            height: 100,
            minHeight: 100,
            resizeMode: "cover",
            ...tailwind("flex-1 rounded-t-sm"),
          }}
        />
        <View style={[tailwind("-mt-8 p-2"), boxStyle.imageOverlay]}>
          <Text style={tailwind("text-gray-100 font-semibold")}>
            {t("category.products.count", { count: categoryWithProducts.products.length })}
          </Text>
        </View>
        <Text style={tailwind("pt-2 font-bold px-2")}>{categoryWithProducts.title}</Text>
        <Text style={tailwind("mt-1 mb-3 px-2")}>{categoryWithProducts.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const CategoryList = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const { categorizedList, isLoading } = useProductListStore(state =>
    pick(state, ["categorizedList", "isLoading"]),
  );
  const loadProductList = useProductListStore(getProductListLoader);
  const onCategoryPress = (categoryWithProducts: CategoryWithProducts) => {
    navigation.navigate("CategoryScreen", { categoryWithProducts });
  };

  React.useEffect(() => {
    loadProductList();
  }, [loadProductList]);

  return (
    <FlatList
      numColumns={2}
      data={categorizedList}
      style={tailwind("w-full px-2")}
      renderItem={entry => (
        <CategoryItem
          t={t}
          categoryWithProducts={entry.item}
          onPress={() => onCategoryPress(entry.item)}
        />
      )}
      keyExtractor={categoryWithProducts => `category_${categoryWithProducts.id}`}
      ListHeaderComponent={
        <HeaderComponent text={t("category.list.header")}>
          <View style={tailwind("flex items-end flex-row")}>
            {isLoading && <ActivityIndicator />}
            <CartIconComponent />
          </View>
        </HeaderComponent>
      }
    />
  );
};

export const HomeScreen = () => {
  return (
    <View style={tailwind("flex flex-1")}>
      <CategoryList />
    </View>
  );
};
