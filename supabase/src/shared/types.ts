export type RootTabStackParamList = {
  Home: undefined;
  Settings: undefined;
};

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
