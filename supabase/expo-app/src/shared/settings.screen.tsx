import { ScrollView, Alert, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import React from "react";
import tailwind from "tailwind-rn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LANG_KEY } from "../i18n";
import { AvatarProfileComponent } from "../auth/avatar.component";
import { useAuth } from "../auth/context";
import { ButtonComponent } from "./button.component";
import { TitleComponent } from "./title.component";
import { AddressListComponent } from "../address/list.component";
import { RootStackParamList } from "./types";
import { HeaderComponent } from "./header.component";

const LanguageButton = ({
  handleLangSwitch,
  isCurrentLanguage,
  text,
}: {
  handleLangSwitch: () => void;
  isCurrentLanguage: boolean;
  text: string;
}) => {
  return (
    <TouchableOpacity
      onPress={handleLangSwitch}
      style={tailwind(`rounded px-4 py-2 mr-2 ${isCurrentLanguage ? "bg-blue-800" : ""}`)}
    >
      <Text style={tailwind(isCurrentLanguage ? "text-white" : "")}>{text}</Text>
    </TouchableOpacity>
  );
};

export const SettingsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t, i18n } = useTranslation();
  const { user, handleLogout } = useAuth();

  if (!user) return null;

  const handleLangSwitch = async (lng: string) => {
    await i18n.changeLanguage(lng);
    await AsyncStorage.setItem(LANG_KEY, lng);
  };

  const handleLogoutPress = () => {
    Alert.alert(t("signout.confirm.title"), t("signout.confirm.body"), [
      {
        text: t("signout.confirm.accept"),
        onPress: handleLogout,
      },
      {
        text: t("signout.confirm.reject"),
        style: "cancel",
      },
    ]);
  };

  const rowStyles = tailwind("flex flex-row items-center justify-between my-1");

  return (
    <ScrollView style={tailwind("flex flex-1 px-4")}>
      <TitleComponent text={t("settings.page.header")} />

      <View style={tailwind("bg-gray-50 p-4 rounded")}>
        <View style={tailwind("border-b border-gray-200 pb-2 mb-2")}>
          <View style={rowStyles}>
            <Text>{t("settings.name.label")}</Text>
            <Text>{user?.user_metadata.name}</Text>
          </View>
          <View style={rowStyles}>
            <Text>{t("settings.name.photo")}</Text>
            <AvatarProfileComponent size={40} />
          </View>
        </View>
        <View style={rowStyles}>
          <Text>{t("settings.language.header")}</Text>
          <View style={tailwind("flex flex-row items-center")}>
            <LanguageButton
              text="English"
              isCurrentLanguage={i18n.language === "en"}
              handleLangSwitch={() => handleLangSwitch("en")}
            />
            <LanguageButton
              text="Italian"
              isCurrentLanguage={i18n.language === "it"}
              handleLangSwitch={() => handleLangSwitch("it")}
            />
          </View>
        </View>
      </View>

      <View style={tailwind("mt-4")}>
        <HeaderComponent text={t("settings.page.addressHeader")} type="section">
          <TouchableOpacity onPress={() => navigation.navigate("AddressEditorScreen")}>
            <MaterialCommunityIcons name="plus" size={24} />
          </TouchableOpacity>
        </HeaderComponent>
        <View style={tailwind("bg-gray-50 p-4 rounded")}>
          <AddressListComponent
            onPress={address => navigation.navigate("AddressEditorScreen", { address })}
          />
        </View>
      </View>

      <ButtonComponent
        type="danger"
        onPress={handleLogoutPress}
        text={t("settings.signout.header")}
      />
    </ScrollView>
  );
};
