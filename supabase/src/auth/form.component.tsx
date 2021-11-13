import React from "react";
import tailwind from "tailwind-rn";
import { View, Text } from "react-native";

import { AuthFieldComponent } from "./field.component";
import { useAuthForm } from "./hooks";
import { ButtonComponent } from "../shared/button.component";

export const AuthFormComponent = () => {
  const {
    handleLogin,
    t,
    email,
    setEmail,
    password,
    setPassword,
    isSubmitting,
    errors,
    setFormType,
    formType,
    confirmPassword,
    setConfirmPassword,
    name,
    setName,
  } = useAuthForm();

  return (
    <View style={tailwind("mx-4 mt-4")}>
      {formType === "signup" && (
        <AuthFieldComponent
          value={name}
          onChange={setName}
          placeholder={t("auth.name.placeholder")}
        />
      )}
      <AuthFieldComponent
        value={email}
        onChange={setEmail}
        placeholder={t("auth.email.placeholder")}
      />
      <AuthFieldComponent
        secureTextEntry
        value={password}
        onChange={setPassword}
        placeholder={t("auth.password.placeholder")}
      />
      {formType === "signup" && (
        <AuthFieldComponent
          secureTextEntry
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder={t("auth.confirm.password.placeholder")}
        />
      )}

      {errors.map(err => (
        <Text style={tailwind("text-red-400 m-2")} key={err}>
          {err}
        </Text>
      ))}

      <ButtonComponent
        onPress={handleLogin}
        isLoading={isSubmitting}
        text={t(`auth.${formType}.button`)}
      />

      <ButtonComponent
        onPress={() => setFormType(formType === "signin" ? "signup" : "signin")}
        text={t(`auth.${formType}.hint.button`)}
        layout="right"
      />
    </View>
  );
};
