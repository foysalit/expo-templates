import React from "react";
import tailwind from "tailwind-rn";
import { Text } from "react-native";

import { TitleComponentProps } from "./types";

export const TitleComponent = ({ text, type }: TitleComponentProps) => {
  const classes = `font-bold ${type === "section" ? "text-xl" : "text-2xl my-2 "}`;
  return <Text style={tailwind(classes)}>{text}</Text>;
};
