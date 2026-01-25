import { CommentDTO, PostDTO } from "@/types/types";
import { create } from "zustand";
import { FetchCommentsProps } from "../services/commentsService";
import { Api } from "../services";
import {
  createComment,
  CreateCommentProps,
} from "../app/actions/comments/create-comment";
import { deleteComment } from "../app/actions/comments/delete-comment";
import { usePostStore } from "./posts-state";

interface Store {
  comments: CommentDTO[];
  post: PostDTO;
  hasNextPage: boolean;
  nextCursor: string | null;
  isFetchingComments: boolean;
  fetchingPost: boolean;

  fetchComments: ({}: FetchCommentsProps) => Promise<void>;
  fetchPostById: (postId: string) => Promise<void>;
  setPost: (post: PostDTO) => void;
  createComment: ({}: CreateCommentProps) => Promise<void>;
  removeComment: (id: string) => Promise<void>;
  resetState: () => void;
}

export const useCommentsState = create<Store>((set) => ({
  comments: [],
  hasNextPage: true,
  nextCursor: null,
  isFetchingComments: true,
  post: {} as PostDTO,
  fetchingPost: true,

  setPost(post) {
    set({ post });
  },

  async fetchPostById(postId) {
    set({ fetchingPost: true });
    const { post } = await Api.posts.getPost(postId);
    set({ post, fetchingPost: false });
  },

  async fetchComments(data) {
    set({ isFetchingComments: true });
    const { comments, hasNextPage, nextCursor } =
      await Api.comments.fetchComments(data);
    set((state) => ({
      comments: [...state.comments, ...comments],
      isFetchingComments: false,
      hasNextPage,
      nextCursor,
    }));
  },

  async createComment(data) {
    const newComment = await createComment(data);
    set((state) => ({
      comments: [newComment, ...state.comments],
      post: { ...state.post, commentsCount: state.post.commentsCount + 1 },
    }));
    usePostStore.getState().updateCommentsCount(data.postId, "inc");
  },

  async removeComment(id) {
    const { deletedComment } = await deleteComment(id);
    set((state) => ({
      comments: state.comments.filter((c) => c.id !== id),
      post: { ...state.post, commentsCount: state.post.commentsCount - 1 },
    }));
    if (deletedComment) {
      usePostStore.getState().updateCommentsCount(deletedComment.postId, "dec");
    }
  },

  resetState() {
    set({
      post: {} as PostDTO,
      fetchingPost: true,
      comments: [],
      hasNextPage: true,
      nextCursor: null,
      isFetchingComments: true,
    });
  },
}));
