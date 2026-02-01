import { PersonDTO, UserDTO } from "@/types/types";
import { axiosInstance } from "./instance";

interface FetchProfileResp {
  profile: UserDTO;
  message: string;
}

interface FetchPeopleResp {
  users: PersonDTO[];

  hasNextPage: boolean;
  nextCursor: string | null;
}

export const fetchProfile = async (
  userId: string
): Promise<FetchProfileResp> => {
  console.log('QWERTY')
  const res = await axiosInstance.get(`/profile/${userId}`);
  return res.data;
};

export const fetchPeople = async (
  cursor: string | null,
  username: string
): Promise<FetchPeopleResp> => {
  const cursorQuery = cursor ? `&cursor=${cursor}` : "";
  const { data } = await axiosInstance.get(
    `/users?username=${username}` + cursorQuery 
  );
  return data;
};
