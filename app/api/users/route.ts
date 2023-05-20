import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error);
  }
}
