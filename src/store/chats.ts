import { Chat } from "@prisma/client";
import { create } from "zustand";
import { Api } from "../services";
import { createChat, CreateChatProps } from "../app/actions/chats/create-chat";

interface Store {
  chats: Chat[];
  currentChat: Chat | null;

  fetchChats: () => Promise<void>;
  createChat: ({}: CreateChatProps) => Promise<void>;
  fetchChatById: (chatId: string) => Promise<void>
}

export const useChatsStore = create<Store>((set) => ({
  chats: [],
  currentChat: null,

  async fetchChatById(chatId) {
    if (chatId) {
      const { chat } = await Api.chats.fetchChatById(chatId)
      set({ currentChat: chat })
    } else {
      set({ currentChat: null })
    }
  },

  async createChat(data) {
    const { newChat } = await createChat(data);
    set((state) => ({
      chats: {
        newChat,
        ...state.chats,
      },
    }));
  },

  async fetchChats() {
    const { chats } = await Api.chats.fetchChats();
    set({ chats });
  },
}));
