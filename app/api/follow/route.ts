import { NextResponse, NextRequest } from 'next/server';

import prisma from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';

export async function POST(req: Request) {
  const { currentUser } = await serverAuth();
  const { userId } = await req.json();
  try {
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID');
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('Invalid ID');
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    updatedFollowingIds.push(userId);

    // NOTIFICATION PART START
    try {
      await prisma.notification.create({
        data: {
          body: 'Someone followed you!',
          userId,
        },
      });

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hasNotification: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
    // NOTIFICATION PART END

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function DELETE(req: NextRequest) {
  const { currentUser } = await serverAuth();
  const userId = req.nextUrl.searchParams.get('userId');

  try {
    if (userId && typeof userId === 'string') {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new Error('Invalid ID');
      }
      let updatedFollowingIds = [...(user.followingIds || [])];
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
      const updatedUser = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          followingIds: updatedFollowingIds,
        },
      });
      return NextResponse.json(updatedUser);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
