import React from "react";
import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { LoginScreen } from "./src/auth/login.screen";
import { MainNavigator } from "./src/shared/main.navigator";
import { useAuth, UserContextProvider } from "./src/auth/context";

const Screens = () => {
  const { user, isAppReady } = useAuth();
  if (!isAppReady) {
    return null;
  }
  return <NavigationContainer>{user ? <MainNavigator /> : <LoginScreen />}</NavigationContainer>;
};

export default function App() {
  return (
    <UserContextProvider>
      <Screens />
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="auto" />
    </UserContextProvider>
  );
}
