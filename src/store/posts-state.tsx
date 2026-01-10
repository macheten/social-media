import { Post } from '@prisma/client'
import { create } from 'zustand'
import { Api } from '../services'

interface Store {
    posts: Post[],
    hasNextPage: boolean,
    endCursor: string | null,

    loading: boolean,
    error: boolean,

    fetchPosts: (userId: string, cursor: string | null) => void
}

export const usePostState = create<Store>((set) => ({
    posts: [] as Post[],
    error: false,
    loading: false,
    endCursor: null,
    hasNextPage: true,

    async fetchPosts(userId, cursor) {
        try {
            set({ loading: true, error: false })
            const { pageInfo, posts } = await Api.posts.fetchPosts({ cursor, userId })
            set({ posts, endCursor: pageInfo.endCursor, hasNextPage: pageInfo.hasNextPage })
        } catch (error) {
            console.error('FETCH POSTS error', error)
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    },
}))