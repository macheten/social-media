import { Post } from "@prisma/client"
import { axiosInstance } from "./instance"

export  interface FetchPostsProps {
    userId: string
    cursor: string | null
}

interface FetchPostsResp {
    posts: Post[]
    hasNextPage: boolean
    endCursor: string
}

export const fetchPosts = async ({ cursor, userId }: FetchPostsProps): Promise<FetchPostsResp> => {
    const endStr = cursor ? `&cursor=${cursor}` : ''
    const res = await axiosInstance.get(`/posts?userId=${userId}${endStr}`)
    return res.data
}