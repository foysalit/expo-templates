import { Alert, View } from "react-native";
import tailwind from "tailwind-rn";
import { useTranslation } from "react-i18next";
import { useStripe } from "@stripe/stripe-react-native";
import React, { useEffect, useState, useCallback } from "react";
import pick from "lodash.pick";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { HeaderComponent } from "../shared/header.component";
import { ButtonComponent } from "../shared/button.component";
import { CartState, useCartStore } from "../product/cart.store";
import { RootTabStackParamList } from "../shared/types";
import { useAuth } from "../auth/context";
import { AddressListComponent } from "../address/list.component";
import { getInCartItemTotal } from "../product/helpers";
import { getDisplayablePrice } from "../shared/helpers";

const getCart = (state: CartState) =>
  pick(state, [
    "items",
    "createOrder",
    "setPaymentIntent",
    "paymentIntent",
    "deliveryAddress",
    "setDeliveryAddress",
  ]);

const useOrderConfirm = () => {
  const stripe = useStripe();
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootTabStackParamList>>();
  const [isPaymentReady, setIsPaymentReady] = useState(false);
  const {
    items,
    paymentIntent,
    setPaymentIntent,
    deliveryAddress,
    setDeliveryAddress,
    createOrder,
  } = useCartStore(getCart);
  const { user } = useAuth();
  const cartTotal = getDisplayablePrice(getInCartItemTotal(items));

  useEffect(() => {
    if (user?.id) setPaymentIntent(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  useEffect(() => {
    if (paymentIntent)
      stripe
        .initPaymentSheet({ paymentIntentClientSecret: paymentIntent.client_secret })
        .then(() => setIsPaymentReady(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentIntent]);

  const handlePayment = useCallback(async () => {
    if (!user?.id) return null;
    const paymentSheet = await stripe.presentPaymentSheet();
    if (paymentSheet.error)
      return Alert.alert(t("payment.error.title", paymentSheet.error.localizedMessage));

    const order = await createOrder(user?.id);
    if (order)
      return navigation.navigate("Order", {
        screen: "OrderDetailsScreen",
        params: { order },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaymentReady]);

  return {
    t,
    cartTotal,
    isPaymentReady,
    handlePayment,
    createOrder,
    setDeliveryAddress,
    deliveryAddress,
  };
};

export const OrderConfirmScreen = () => {
  const { t, cartTotal, isPaymentReady, handlePayment, setDeliveryAddress, deliveryAddress } =
    useOrderConfirm();
  return (
    <View style={tailwind("flex flex-1")}>
      <HeaderComponent text={t("order.confirm.page.deliveryHeader")} type="section" />
      <View style={tailwind("mx-3")}>
        <AddressListComponent onPress={setDeliveryAddress} selected={deliveryAddress} />
      </View>
      <ButtonComponent
        onPress={handlePayment}
        isLoading={!isPaymentReady}
        text={t("payment.initiate.button", { total: cartTotal })}
      />
    </View>
  );
};
