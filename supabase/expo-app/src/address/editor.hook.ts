import * as yup from "yup";
import pick from "lodash.pick";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Address } from "./types";
import { useAddressEditorStore } from "./editor.store";
import { useAddressListStore } from "./list.store";
import { RootStackParamList } from "../shared/types";
import { useAuth } from "../auth/context";

const addressSchema = yup
  .object({
    line_one: yup.string().required(),
    city: yup.string().required(),
    country: yup.string().required(),
    post_code: yup.string().required(),
    line_two: yup.string().optional().nullable(),
    is_default: yup.boolean().optional(),
  })
  .required();

export const useAddressEditor = (
  address: Address | undefined,
  navigation: NativeStackNavigationProp<RootStackParamList, "AddressEditorScreen">,
) => {
  const { t } = useTranslation();
  const { isSaving, save } = useAddressEditorStore(state => pick(state, ["isSaving", "save"]));
  const updateList = useAddressListStore(state => state.update);
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: address,
    resolver: yupResolver(addressSchema),
  });

  const saveAddress = handleSubmit(async addressData => {
    const newAddress = await save({ ...addressData, user_id: user?.id });
    if (newAddress) {
      updateList(newAddress);
      navigation.goBack();
    }
  });

  return { isSaving, saveAddress, control, errors, t };
};
