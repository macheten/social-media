import { PersonDTO } from "@/types/types";
import { create } from "zustand";
import { Api } from "../services";

interface Store {
  people: PersonDTO[];
  hasNextPage: boolean;
  nextCursor: string | null;
  isFetchingPeople: boolean;
  nameQuery: string;

  fetchPeople: (cursor: string | null, username: string) => Promise<void>;
  resetState: () => void;
  setNameQuery: (nameQuery: string) => void
}

export const usePeopleStore = create<Store>((set) => ({
  people: [],
  isFetchingPeople: false,
  hasNextPage: true,
  nextCursor: null,
  nameQuery: '',

  async fetchPeople(cursor, username) {
    try {
      set({ isFetchingPeople: true });
      const { hasNextPage, nextCursor, users } =
        await Api.user.fetchPeople(cursor, username);
      set((state) => ({
        hasNextPage,
        nextCursor,
        people: [...state.people, ...users],
      }));
    } catch (error) {
      throw error;
    } finally {
      set({ isFetchingPeople: false });
    }
  },

  setNameQuery(nameQuery) {
    set({ nameQuery })
  },

  resetState() {
    set({
      hasNextPage: true,
      nextCursor: null,
      people: [],
      isFetchingPeople: false,
    });
  },
}));
