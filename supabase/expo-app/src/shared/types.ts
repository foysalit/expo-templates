import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";

import { OrderWithItems } from "../order/types";
import { CategoryWithProducts } from "../product/types";
import { Address } from "../address/types";

export type OrderStackParamList = {
  OrderListScreen: undefined;
  OrderDetailsScreen: { order: OrderWithItems };
};

export type OrderDetailsScreenProps = NativeStackScreenProps<
  OrderStackParamList,
  "OrderDetailsScreen"
>;

export type RootTabStackParamList = {
  Home: undefined;
  Order: NavigatorScreenParams<OrderStackParamList>;
  Settings: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  CartScreen: undefined;
  OrderConfirmScreen: undefined;
  CategoryScreen: { categoryWithProducts: CategoryWithProducts };
};

export type CategoryScreenProps = NativeStackScreenProps<HomeStackParamList, "CategoryScreen">;

export type RootStackParamList = {
  MainTabs: RootTabStackParamList;
  UserListScreen: undefined;
  AddressEditorScreen: { address?: Address } | undefined;
};
export type AddressEditorScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AddressEditorScreen"
>;

export type ButtonComponentProps = {
  text: string;
  isLoading?: boolean;
  onPress: () => void;
  layout?: "block" | "right";
  type?: "primary" | "danger";
};

export type TitleComponentProps = {
  text: string;
  type?: "page" | "section";
};

export type HeaderComponentProps = TitleComponentProps & {
  children?: React.ReactNode;
};

export type ListEmptyComponentProps = {
  title: string;
  description: string;
  Icon?: React.ReactNode;
  actionButtonText?: string;
  onActionButtonPress?: () => void;
};
