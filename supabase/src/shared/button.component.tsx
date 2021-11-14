import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";
import React from "react";
import { ButtonComponentProps } from "./types";

const getButtonColor = (type: ButtonComponentProps["type"]) => {
  switch (type) {
    case "primary":
      return "blue-500";
    case "danger":
      return "red-500";
    default:
      return "blue-500";
  }
};

const getButtonTextColor = (
  type: ButtonComponentProps["type"],
  layout: ButtonComponentProps["layout"],
) => {
  switch (type) {
    case "primary":
      return "blue-500";
    case "danger":
      return "red-500";
    default:
      return "blue-500";
  }
};

export const ButtonComponent = ({
  text,
  testID,
  onPress,
  isLoading,
  layout = "block",
  type = "primary",
}: ButtonComponentProps) => {
  const buttonColor = getButtonColor(type);
  const buttonTextColor = getButtonTextColor(type, layout);
  let style = tailwind("items-end px-2 py-3");
  if (layout === "block")
    style = tailwind(`flex items-center py-3 border border-${buttonColor} mt-3 mx-2 rounded`);

  return (
    <TouchableOpacity style={style} onPress={onPress} testID={testID}>
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Text style={tailwind(`text-${buttonTextColor}`)}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};
