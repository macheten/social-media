import { UserDTO } from "@/types/types";
import { Api } from "@/src/services";
import { useEffect, useState } from "react";

export const useProfile = (userId: string) => {
  const [profile, setProfile] = useState<UserDTO | null>(null);

  useEffect(() => {
    async function fetch() {
      setProfile((await Api.user.fetchProfile(userId)).profile);
    }
    fetch();
  }, [userId]);

  return profile
};
