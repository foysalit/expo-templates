import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Controller, Control, FieldError } from "react-hook-form";
import tailwind from "tailwind-rn";
import Checkbox from "expo-checkbox";

import { TFunction } from "react-i18next";
import { AddressEditorScreenProps } from "../shared/types";
import { HeaderComponent } from "../shared/header.component";
import { useAddressEditor } from "./editor.hook";
import { Address } from "./types";

const AddressInput = ({
  control,
  error,
  name,
  t,
}: {
  name: keyof Omit<Address, "id">;
  control: Control<Address>;
  error: FieldError | undefined;
  t: TFunction<"translation", undefined>;
}) => {
  const isDefault = name === "is_default";
  const field = isDefault ? (
    <View style={tailwind("flex flex-row items-center mt-2")}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            value={!!value}
            disabled={false}
            onValueChange={newValue => onChange(newValue)}
          />
        )}
        name={name}
      />
      <Text style={tailwind("ml-2")}>{t(`address.editor.${name}.label`)}</Text>
    </View>
  ) : (
    <>
      <Text>{t(`address.editor.${name}.label`)}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={tailwind("py-1 border-b border-gray-400 h-10")}
            onChangeText={onChange}
            autoCapitalize="none"
            value={`${value || ""}`}
            onBlur={onBlur}
          />
        )}
        name={name}
      />
    </>
  );

  return (
    <View style={tailwind("px-2 mb-2 w-full")}>
      {field}
      {error && (
        <Text style={tailwind("text-red-600")}>{t(`address.editor.${name}.${error.type}`)}</Text>
      )}
    </View>
  );
};

export const AddressEditorScreen = (props: AddressEditorScreenProps) => {
  const { route, navigation } = props;
  const { address } = route.params || {};
  const { isSaving, saveAddress, control, errors, t } = useAddressEditor(address, navigation);

  return (
    <ScrollView>
      <HeaderComponent text={t(address ? "address.edit.header" : "address.create.header")}>
        {isSaving ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity onPress={saveAddress}>
            <MaterialCommunityIcons name="check" size={24} />
          </TouchableOpacity>
        )}
      </HeaderComponent>
      <View style={tailwind("w-full")}>
        <AddressInput name="line_one" error={errors.line_one} control={control} t={t} />
        <AddressInput name="line_two" error={errors.line_two} control={control} t={t} />
        <View style={tailwind("flex flex-row ")}>
          <View style={tailwind("w-1/2")}>
            <AddressInput name="city" error={errors.city} control={control} t={t} />
          </View>
          <View style={tailwind("w-1/2")}>
            <AddressInput name="post_code" error={errors.post_code} control={control} t={t} />
          </View>
        </View>
        <AddressInput name="country" error={errors.country} control={control} t={t} />
        <AddressInput name="is_default" error={errors.is_default} control={control} t={t} />
      </View>
    </ScrollView>
  );
};
