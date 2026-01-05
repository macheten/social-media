import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

interface GetProfileParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: NextRequest, { params }: GetProfileParams) {
  try {
    const { id } = await params;
    const profile = await prisma.user.findFirst({
      where: {
        id,
      },
    
      // исключение ненужных полей
      omit: {
        password: true,
        provider: true,
        providerId: true,
        email: true
      }
    });

    if (!profile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Success", profile });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
