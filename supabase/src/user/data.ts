import { Alert } from "react-native";

import { PublicUser } from "./types";
import { supabase } from "../supabase";

/**
 * Run the following SQL on supabase to build a user list view
 DROP VIEW user_list_view;

 CREATE VIEW user_list_view AS
   SELECT id, raw_user_meta_data -> 'name' AS name
   FROM auth.users;
 */

export const LIST_VIEW = "user_list_view";

export const getUserList = async (): Promise<PublicUser[] | null> => {
  const { data, error } = await supabase.from<PublicUser>(LIST_VIEW).select();

  if (error) {
    Alert.alert(error.message);
  }
  return data;
};
