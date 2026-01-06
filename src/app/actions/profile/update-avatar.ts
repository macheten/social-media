'use server'

import { put } from '@vercel/blob';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { prisma } from '@/prisma/prisma-client';

interface ReturnType {
    message: string
    success: boolean
    newImageUrl?: string
}

export async function updateAvatar(image: File): Promise<ReturnType> {
    const session = await getServerSession(authOptions)
    const error = {
            message: 'Что-то пошло не так',
            success: false
        }

    if (!session) {
        return error
    }

    const blob = await put(image.name, image, {
        access: 'public',
        addRandomSuffix: true
    })

    if (!blob.url) {
        return error
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    await prisma.user.update({
        where: {
            id: session.user.id
        },

        data: {
            imageUrl: blob.url
        }
    })

    return {
        message: 'Фотография профиля обновлена',
        success: true,
        newImageUrl: blob.url
    }

}