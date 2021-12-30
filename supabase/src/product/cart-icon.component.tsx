import React from "react";
import tailwind from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useCartStore } from "./cart.store";
import { getInCartItemCount } from "./helpers";
import { HomeStackParamList } from "../shared/types";

export const CartIconComponent = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const items = useCartStore(state => state.items);
  const totalQty = getInCartItemCount(items);
  return (
    <TouchableOpacity
      style={tailwind("relative")}
      onPress={() => navigation.navigate("CartScreen")}
    >
      {totalQty > 0 && (
        <View style={tailwind("absolute -top-2 -right-2 z-10")}>
          <Text style={tailwind(" text-blue-800 font-bold text-xs")}>{totalQty}</Text>
        </View>
      )}
      <MaterialCommunityIcons name={totalQty > 0 ? "cart" : "cart-off"} size={22} />
    </TouchableOpacity>
  );
};
