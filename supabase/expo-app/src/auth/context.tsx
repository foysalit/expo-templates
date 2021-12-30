import * as SplashScreen from "expo-splash-screen";
import { Session, User } from "@supabase/supabase-js";
import React, { useEffect, useState, createContext, useContext } from "react";

import { supabase } from "../supabase";
import { UserContextType } from "./types";
import { initiateTranslation } from "../i18n";
import { deleteAuthToken, getAuthToken } from "./helpers";

export const UserContext = createContext<UserContextType>({
  user: null,
  session: null,
  isAppReady: false,
  handleLogout: () => Promise.resolve(),
});

export const UserContextProvider = (props: any) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    // Listen for any change in authentication
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    // Leave the splash screen in view until translation is loaded, previously stored auth token
    // is checked and auth state has been changed accordingly. Once all of that is done,
    // hide the splash screen and change state to start rendering the app
    SplashScreen.preventAutoHideAsync()
      .then(initiateTranslation)
      .then(getAuthToken)
      .then(existingAuthToken => {
        if (existingAuthToken) {
          supabase.auth.setAuth(existingAuthToken);
          setSession(supabase.auth.session());
          setUser(supabase.auth.user());
        }
      })
      .finally(() => {
        setIsAppReady(true);
        return SplashScreen.hideAsync();
      });

    return () => {
      // When the component is unmounted, make sure the listener is destroyed
      authListener?.unsubscribe?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    await deleteAuthToken();
    setSession(null);
    setUser(null);
  };

  const value = {
    handleLogout,
    isAppReady,
    session,
    user,
  };
  return <UserContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a UserContextProvider.`);
  }
  return context;
};
