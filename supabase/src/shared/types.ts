import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CategoryWithProducts } from "../product/types";

export type RootTabStackParamList = {
  Home: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  CategoryScreen: { categoryWithProducts: CategoryWithProducts };
};

export type CategoryScreenProps = NativeStackScreenProps<HomeStackParamList, "CategoryScreen">;

export type RootStackParamList = {
  MainTabs: RootTabStackParamList;
  UserListScreen: undefined;
};

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
