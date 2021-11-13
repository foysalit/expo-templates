import { User } from "@supabase/supabase-js";

export type PublicUser = {
  id: User["id"];
  name: string;
};
