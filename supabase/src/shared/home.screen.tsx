import React from "react";
import tailwind from "tailwind-rn";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";
import { ButtonComponent } from "./button.component";

export const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={tailwind("flex flex-1 justify-center items-center")}>
      <View style={tailwind("w-2/3")}>
        <Text style={tailwind("text-3xl font-bold text-center")}>{t("home.greetings")}</Text>
        <ButtonComponent
          text={t("home.users.button")}
          onPress={() => navigation.navigate("UserListScreen")}
        />
      </View>
    </View>
  );
};
