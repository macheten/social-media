import { Comment, Post, User } from "@prisma/client";

export type UserDTO = Omit<
  User,
  "password" | "provider" | "providerId" | "email"
>;
export interface PersonDTO {
  id: string;
  username: string;
  imageUrl: string;
}

export interface CommentDTO extends Comment {
  author: {
    username: string
    imageUrl: string | null
  }
}

export interface PostDTO extends Post {
  author: {
    username: string
    imageUrl: string
  }
  commentsCount: number
}
