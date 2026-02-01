import { MessageDTO } from "@/types/types";
import { create } from "zustand";
import { Api } from "../services";
import toast from "react-hot-toast";
import {
  createMessage,
  CreateMessageProps,
} from "../app/actions/chats/create-message";
import { GetMessagesProps } from "../services/messages";

interface Store {
  messages: MessageDTO[];
  hasNextPage: boolean;
  nextCursor: string | null;
  isFetching: boolean;

  fetchMessages: ({}: GetMessagesProps) => Promise<void>;
  addMessage: ({}: CreateMessageProps) => Promise<void>;
  resetState: () => void;
}

export const useMessagesStore = create<Store>((set) => ({
  messages: [],
  hasNextPage: true,
  nextCursor: null,
  isFetching: false,

  async fetchMessages(data) {
    try {
      set({ isFetching: true });
      const { messages, hasNextPage, nextCursor } =
        await Api.messages.getMessages(data);
      set((state) => ({
        messages: [...messages, ...state.messages],
        hasNextPage,
        nextCursor,
      }));
    } catch (error) {
    } finally {
      set({ isFetching: false });
    }
  },

  async addMessage(data) {
    try {
      const { message } = await createMessage(data);
      set((state) => ({ messages: [message, ...state.messages] }));
    } catch (error) {
      throw error;
    }
  },

  resetState() {
    set({
      messages: [],
      hasNextPage: true,
      nextCursor: null,
      isFetching: false,
    });
  },
}));
