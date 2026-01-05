import { UserDTO } from "@/types/types"
import { axiosInstance } from "./instance"

interface FetchProfileResp {
    profile: UserDTO
    message: string
}

export const fetchProfile = async (userId: string): Promise<FetchProfileResp> => {
    const { data } = await axiosInstance.get(`/profile/${userId}`)
    return data
}