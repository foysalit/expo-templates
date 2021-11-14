import React from "react";
import tailwind from "tailwind-rn";
import { Text } from "react-native";

import { TitleComponentProps } from "./types";

export const TitleComponent = ({ text }: TitleComponentProps) => {
  return <Text style={tailwind("my-2 font-bold text-2xl")}>{text}</Text>;
};
