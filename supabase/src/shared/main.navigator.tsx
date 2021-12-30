import React from "react";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "./home.screen";
import { SettingsScreen } from "./settings.screen";
import { CartScreen } from "../product/cart.screen";
import { UserListScreen } from "../user/list.screen";
import { CategoryScreen } from "../product/category.screen";
import { HomeStackParamList, RootStackParamList, RootTabStackParamList } from "./types";

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<RootTabStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="CategoryScreen" component={CategoryScreen} />
      <HomeStack.Screen name="CartScreen" component={CartScreen} />
    </HomeStack.Navigator>
  );
};

export const TabStack = () => {
  return (
    <Tab.Navigator sceneContainerStyle={{ paddingTop: Constants.statusBarHeight }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="badminton" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const MainNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainTabs" component={TabStack} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: "modal", headerShown: false }}>
        <RootStack.Screen name="UserListScreen" component={UserListScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
