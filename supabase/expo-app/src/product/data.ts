import { Alert } from "react-native";

import { Category, CategoryWithProducts } from "./types";
import { supabase } from "../supabase";

/**
 * SUPABASE_SQL_QUERY_TO_RUN
 * Run the following SQL on supabase to build a user list view
 DROP VIEW IF EXISTS user_list_view;

 CREATE VIEW user_list_view AS
 SELECT id, raw_user_meta_data -> 'name' AS name
 FROM auth.users;
 */

export const getCategoriesWithProducts = async (): Promise<CategoryWithProducts[] | null> => {
  const { data, error } = await supabase
    .from<CategoryWithProducts>("product_categories")
    .select("*, products(*)");

  if (error) {
    Alert.alert(error.message);
  }

  return data;
};
