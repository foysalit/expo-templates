import tailwind, { getColor } from "tailwind-rn";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { AddressItemComponentProps } from "./types";

export const AddressItemComponent = ({
  isLast,
  isSelected,
  address,
}: AddressItemComponentProps) => {
  let styles = "flex flex-row justify-between items-center";
  if (!isLast) styles += " border-b border-gray-200 mb-2 pb-2";

  return (
    <View style={tailwind(styles)}>
      <View>
        <Text>{address.line_one}</Text>
        {address.line_two && <Text>{address.line_two}</Text>}
        <Text>
          {address.city}, {address.post_code}, {address.country}
        </Text>
      </View>
      <View>
        {address.is_default && (
          <MaterialCommunityIcons name="home" size={24} color={getColor("blue-800")} />
        )}
        {isSelected && (
          <MaterialCommunityIcons name="check" size={24} color={getColor("blue-800")} />
        )}
      </View>
    </View>
  );
};
