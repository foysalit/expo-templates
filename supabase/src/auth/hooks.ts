import { useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../supabase";
import { setAuthToken } from "./helpers";
import { AuthFormType } from "./types";

export const useAuthForm = () => {
  const [formType, setFormType] = useState<AuthFormType>("signin");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { t } = useTranslation();

  const handleLogin = async () => {
    // If we're already in the submitting state, don't submit the form again and
    // allow the previous submission to complete
    if (isSubmitting) return;

    // Let UI know that submission started
    setIsSubmitting(true);

    // Given the form type, submit the appropriate form and only collect the error
    // from the call if there are any Because on success, the auth state will change
    // and our user context will handle that change and change state accordingly
    const { error } =
      formType === "signin"
        ? await supabase.auth.signIn({ email, password })
        : await supabase.auth.signUp({ email, password }, { data: { name } });

    // Let the UI know submission is complete
    setIsSubmitting(false);

    // Save token in local for subsequent access
    const session = supabase.auth.session();
    if (session?.access_token) await setAuthToken(session?.access_token);
    if (error) setErrors([error.message]);
  };

  return {
    t,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    confirmPassword,
    setConfirmPassword,
    formType,
    setFormType,
    errors,
    handleLogin,
    isSubmitting,
  };
};
