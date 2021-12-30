import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// Here we import the bundle file as defined above
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as resources from "./translation.json";

export const LANG_KEY = "@preferences/lang";

export const initiateTranslation = () => {
  return i18n
    .use(initReactI18next)
    .use({
      type: "languageDetector",
      async: true,
      detect: async (callback: (lng: string) => void) => {
        const preferredLang = await AsyncStorage.getItem(LANG_KEY);
        if (preferredLang) return callback(preferredLang);
        const initialLang = Localization.locale.split("-")[0];
        return callback(initialLang);
      },
      init: () => null,
      cacheUserLanguage: async (lng: string) => {
        await AsyncStorage.setItem(LANG_KEY, lng);
      },
    }) // detects default language
    .init({
      resources,
      fallbackLng: "en",
    });
};
export default i18n;
