import React from "react";
import tailwind from "tailwind-rn";
import { Text, View } from "react-native";

import { AuthFormComponent } from "./form.component";

export const LoginScreen = () => {
  return (
    <View style={tailwind("flex flex-1 justify-center")}>
      <View
        style={tailwind(
          "flex flex-row items-center mx-16 justify-center border-b-4 mb-4 border-red-600",
        )}
      >
        <Text style={tailwind("text-3xl pb-2 font-bold")}>Expo + Meteor</Text>
      </View>
      <AuthFormComponent />
    </View>
  );
};
