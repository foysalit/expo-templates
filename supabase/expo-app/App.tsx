import React from "react";
import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { STRIPE_PUBLISHABLE_KEY } from "@env";

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
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <Screens />
      </StripeProvider>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="auto" />
    </UserContextProvider>
  );
}
