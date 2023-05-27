import { NextResponse, NextRequest } from 'next/server';

import serverAuth from '@/libs/serverAuth';
import prisma from '@/libs/prismadb';

export async function POST(req: NextRequest) {
  const tweetId = req.nextUrl.searchParams.get('tweetId');
  console.log(tweetId);
  try {
    const { currentUser } = await serverAuth();
    const { body } = await req.json();
    if (!tweetId || typeof tweetId !== 'string') {
      throw new Error('Invalid ID');
    }
    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        tweetId,
      },
    });
    // NOTIFICATION PART START
    try {
      const tweet = await prisma.tweet.findUnique({
        where: {
          id: tweetId,
        },
      });
      if (tweet?.userId) {
        await prisma.notification.create({
          data: {
            body: 'Someone replied on your tweet!',
            userId: tweet.userId,
          },
        });
        await prisma.user.update({
          where: {
            id: tweet.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    // NOTIFICATION PART END
    return NextResponse.json(comment);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
