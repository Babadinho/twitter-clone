import { NextResponse, NextRequest } from 'next/server';

import prisma from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';

export async function POST(req: Request) {
  const { currentUser } = await serverAuth();
  const { tweetId } = await req.json();
  try {
    if (!tweetId || typeof tweetId !== 'string') {
      throw new Error('Invalid ID');
    }

    const tweet = await prisma.tweet.findUnique({
      where: {
        id: tweetId,
      },
    });

    if (!tweet) {
      throw new Error('Invalid ID');
    }

    let updatedLikedIds = [...(tweet.likedIds || [])];

    updatedLikedIds.push(currentUser.id);

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
            body: 'Someone liked your tweet!',
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

    const updatedTweet = await prisma.tweet.update({
      where: {
        id: tweetId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return NextResponse.json(updatedTweet);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function DELETE(req: NextRequest) {
  const { currentUser } = await serverAuth();
  const tweetId = req.nextUrl.searchParams.get('tweetId');
  try {
    if (!tweetId || typeof tweetId !== 'string') {
      throw new Error('Invalid ID');
    }

    const tweet = await prisma.tweet.findUnique({
      where: {
        id: tweetId,
      },
    });

    if (!tweet) {
      throw new Error('Invalid ID');
    }

    let updatedLikedIds = [...(tweet.likedIds || [])];
    updatedLikedIds = updatedLikedIds.filter(
      (likedId) => likedId !== currentUser?.id
    );

    const updatedTweet = await prisma.tweet.update({
      where: {
        id: tweetId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return NextResponse.json(updatedTweet);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
