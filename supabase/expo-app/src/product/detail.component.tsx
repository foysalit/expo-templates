import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tailwind, { getColor } from "tailwind-rn";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getDisplayablePrice } from "../shared/helpers";
import { ProductItemComponentProps } from "./types";

export const ProductDetailComponent = ({
  product,
  inCartQty,
  onAddToCart,
  onRemoveFromCart,
}: ProductItemComponentProps) => {
  return (
    <View style={tailwind("w-full")}>
      <View style={tailwind("flex flex-row")}>
        <Image source={{ uri: product.picture }} style={tailwind("w-20 h-20 rounded-lg")} />
        <View style={tailwind("flex flex-row flex-1 items-center justify-around")}>
          <View style={tailwind("pl-2 w-4/5")}>
            <Text style={tailwind("font-bold text-gray-800")}>{product.title}</Text>
            {!!product.description && (
              <Text style={tailwind("text-gray-700")}>{product.description}</Text>
            )}
            <Text style={tailwind("mt-2")}>
              {getDisplayablePrice(product.unit_price)}/{product.unit_size}
            </Text>
          </View>
        </View>
      </View>
      <View style={tailwind("ml-24 p-4 flex flex-row justify-between items-center")}>
        <TouchableOpacity onPress={() => onAddToCart?.(inCartQty + 1)}>
          <MaterialCommunityIcons name="plus" size={24} />
        </TouchableOpacity>
        <Text style={tailwind("text-lg font-semibold")}>{inCartQty}</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="minus" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
