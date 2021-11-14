import Meteor from "@meteorrn/core";

export type AuthFormType = "signup" | "signin";

export type UserContextType = {
  isAppReady: boolean;
  user: Meteor.User | null;
  handleLogout: () => Promise<void>;
};

export type AuthFieldProps = {
  value: string;
  placeholder?: string;
  autoCapitalize?: "none";
  secureTextEntry?: boolean;
  onChange: (text: string) => void;
};
