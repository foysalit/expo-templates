import Meteor, { Accounts } from "@meteorrn/core";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState, createContext, useContext } from "react";

import { UserContextType } from "./types";
import { connectToMeteor } from "../meteor";
import { initiateTranslation } from "../i18n";

export const UserContext = createContext<UserContextType>({
  user: null,
  isAppReady: false,
  handleLogout: () => Promise.resolve(),
});

export const UserContextProvider = (props: any) => {
  const [user, setUser] = useState<UserContextType["user"]>(null);
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    // Listen for any change in authentication
    Accounts.onLogin(() => {
      setUser(Meteor.user());
    });

    // Leave the splash screen in view until translation is loaded, previously stored auth token
    // is checked and auth state has been changed accordingly. Once all of that is done,
    // hide the splash screen and change state to start rendering the app
    SplashScreen.preventAutoHideAsync()
      .then(() => {
        connectToMeteor();
        return initiateTranslation();
      })
      .finally(() => {
        setIsAppReady(true);
        return SplashScreen.hideAsync();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    Accounts.logout((err: Meteor.Error) => {
      if (!err) setUser(null);
    });
  };

  const value = {
    handleLogout,
    isAppReady,
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
