import React from "react";
import tailwind, { getColor } from "tailwind-rn";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Product } from "./types";
import { getDisplayablePrice } from "../shared/helpers";

type ProductItemProps = {
  product: Product;
  inCartQty: number;
  onRemoveFromCart?: () => void;
  onAddToCart?: (qty: number) => void;
};

export const ProductItemComponent = ({
  product,
  onAddToCart,
  inCartQty,
  onRemoveFromCart,
}: ProductItemProps) => {
  return (
    <TouchableOpacity style={tailwind("px-4 mb-2")}>
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
          <View>
            {onAddToCart && onRemoveFromCart && (
              <TouchableOpacity
                onPress={() => (inCartQty > 0 ? onRemoveFromCart() : onAddToCart(inCartQty + 1))}
              >
                <MaterialCommunityIcons
                  color={getColor(inCartQty > 0 ? "red-500" : "green-500")}
                  name={inCartQty > 0 ? "cart-remove" : "cart-plus"}
                  size={20}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
