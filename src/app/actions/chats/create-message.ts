'use server'

import { prisma } from "@/prisma/prisma-client"
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"

export interface CreateMessageProps {
    content: string
    chatId: string
}

export async function createMessage({ content, chatId }: CreateMessageProps) {
    const session = await getServerSession(authOptions)

    if (!session) {
        throw new Error('unauthorized')
    }

    const message = await prisma.message.create({
        data: {
            content,
            chatId,
            userId: session.user.id
        },

        include: {
            user: {
                select: {
                    imageUrl: true,
                    username: true
                }
            }
        }
    })

    if (!message) {
        throw new Error('message was not created')
    }

    return {
        message
    }
}