import React, { useCallback, useEffect } from "react";
import pick from "lodash.pick";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import tailwind, { getColor } from "tailwind-rn";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AddressListState, useAddressListStore } from "./list.store";
import { ListEmptyComponent } from "../shared/list-empty.component";
import { RootStackParamList } from "../shared/types";
import { AddressListComponentProps } from "./types";
import { AddressItemComponent } from "./item.component";

const getAddressList = (state: AddressListState) =>
  pick(state, ["list", "isLoading", "load", "remove"]);

export const AddressListComponent = ({ onPress, selected }: AddressListComponentProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { list, isLoading, load, remove } = useAddressListStore(getAddressList);
  const showRemoveConfirmation = useCallback(
    address =>
      Alert.alert(t("address.remove.confirmTitle"), t("address.remove.confirmDescription"), [
        {
          text: t("address.remove.confirmAccept"),
          onPress: () => remove(address.id),
        },
        {
          text: t("address.remove.confirmCancel"),
          style: "cancel",
        },
      ]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <ActivityIndicator />;

  if (!list.length) {
    return (
      <ListEmptyComponent
        title={t("address.emptyHeader")}
        description={t("address.emptyDescription")}
        actionButtonText={t("address.emptyAction")}
        onActionButtonPress={() => navigation.navigate("AddressEditorScreen")}
      />
    );
  }

  return (
    <>
      {list.map((address, index) => {
        const isLast = index === list.length - 1;
        const isSelected = selected?.id === address.id;
        return (
          <TouchableOpacity
            key={`address_${address.id}`}
            onPress={() => onPress(address)}
            onLongPress={() => showRemoveConfirmation(address)}
          >
            <AddressItemComponent address={address} isLast={isLast} isSelected={isSelected} />
          </TouchableOpacity>
        );
      })}
    </>
  );
};
