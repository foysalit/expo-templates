import React from "react";
import tailwind from "tailwind-rn";
import { View } from "react-native";

import { HeaderComponentProps } from "./types";
import { TitleComponent } from "./title.component";

export const HeaderComponent = ({ text, type, children }: HeaderComponentProps) => {
  return (
    <View style={tailwind("px-2 py-2 flex w-full flex-row items-center justify-between")}>
      <TitleComponent {...{ text, type }} />
      {children}
    </View>
  );
};
