import { UserDTO } from "@/types/types";
import { create } from "zustand";

interface Store {
    profile: UserDTO,
    getProfile: (id: string) => void
    setProfilePicture: (imageUrl: string) => void
}

export const useProfileStore = create<Store>((set) => ({
    profile: {} as UserDTO,

    getProfile: (id) => set({ profile }),
    setProfilePicture: (imageUrl) => set(state => ({ profile: { ...state.profile, imageUrl } }))
}))
