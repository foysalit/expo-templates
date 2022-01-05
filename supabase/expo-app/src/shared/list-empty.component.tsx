import React from "react";
import tailwind from "tailwind-rn";
import { Text, View } from "react-native";

import { ListEmptyComponentProps } from "./types";
import { ButtonComponent } from "./button.component";

export const ListEmptyComponent = ({
  title,
  description,
  Icon,
  actionButtonText,
  onActionButtonPress,
}: ListEmptyComponentProps) => {
  return (
    <View style={tailwind("px-2 flex flex-grow items-center justify-center")}>
      {Icon}
      <Text style={tailwind("text-center text-gray-700 font-semibold")}>{title}</Text>
      <Text style={tailwind("text-center text-gray-500")}>{description}</Text>
      <View style={tailwind("w-full")}>
        {!!actionButtonText && onActionButtonPress && (
          <ButtonComponent text={actionButtonText} onPress={onActionButtonPress} layout="block" />
        )}
      </View>
    </View>
  );
};
