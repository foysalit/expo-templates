import { Session, User } from "@supabase/supabase-js";

export type AuthFormType = "signup" | "signin";

export type UserContextType = {
  user: User | null;
  isAppReady: boolean;
  session: Session | null;
  handleLogout: () => Promise<void>;
};

export type AuthFieldProps = {
  value: string;
  placeholder?: string;
  autoCapitalize?: "none";
  secureTextEntry?: boolean;
  onChange: (text: string) => void;
};
