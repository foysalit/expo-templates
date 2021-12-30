import React from "react";
import tailwind from "tailwind-rn";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View, Text, FlatList } from "react-native";

import { PublicUser } from "./types";
import { useUserList } from "./hooks";
import { TitleComponent } from "../shared/title.component";
import { AvatarProfileComponent } from "../auth/avatar.component";

const UserListComponent = ({ users }: { users: PublicUser[] }) => {
  const { t } = useTranslation();
  if (users.length <= 0) {
    return (
      <View>
        <Text style={tailwind("m-3 text-lg")}>{t("users.empty")}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <View style={tailwind("p-3 flex flex-row")}>
          <AvatarProfileComponent size={30} />
          <Text style={tailwind("text-lg ml-2")}>{item.name}</Text>
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
};

export const UserListScreen = () => {
  const { t } = useTranslation();
  const { users, isLoading } = useUserList();

  return (
    <View style={tailwind("mt-4")}>
      <View style={tailwind("ml-3")}>
        <TitleComponent text={t("users.title")} />
      </View>

      {isLoading ? <ActivityIndicator /> : <UserListComponent users={users} />}
    </View>
  );
};
