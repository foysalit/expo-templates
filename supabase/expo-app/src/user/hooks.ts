import { useEffect, useState } from "react";

import { PublicUser } from "./types";
import { getUserList } from "./data";

export const useUserList = () => {
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUserList()
      .then(userList => {
        if (userList?.length) setUsers(userList);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { users, isLoading };
};
