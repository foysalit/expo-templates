import React from "react";
import tailwind from "tailwind-rn";
import { TextInput, View } from "react-native";

import { AuthFieldProps } from "./types";

export const AuthFieldComponent = ({
  autoCapitalize = "none",
  secureTextEntry,
  placeholder,
  onChange,
  value,
}: AuthFieldProps) => {
  return (
    <View style={tailwind("flex m-2 border-b border-gray-400")}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        style={tailwind("flex p-2 w-full")}
      />
    </View>
  );
};
