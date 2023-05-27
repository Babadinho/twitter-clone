import { NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  try {
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID');
    }
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(notifications);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
