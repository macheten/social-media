import { UserDTO } from "@/types/types";
import { create } from "zustand";
import { Api } from "../services";

interface Store {
  profile: UserDTO;
  loading: boolean;
  error: boolean;

  getProfile: (id: string) => Promise<void>;
  setProfilePicture: (imageUrl: string) => void;
}

export const useProfileStore = create<Store>((set) => ({
  profile: {} as UserDTO,
  error: false,
  loading: true,

  getProfile: async (id) => {
    try {
      set({ error: false, loading: true });
      const { profile } = await Api.user.fetchProfile(id);
      set({ profile: profile });
    } catch (error) {
      console.error("GET PROFILE Store error", error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  setProfilePicture: (imageUrl) => {
    set((state) => ({ profile: { ...state.profile, imageUrl } }));
  },
}));
