import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function GET(
  req: Request,
  { params }: { params: { tweetId: string } }
) {
  try {
    const { tweetId } = params;

    if (!tweetId || typeof tweetId !== 'string') {
      throw new Error('Invalid ID');
    }

    const tweet = await prisma.tweet.findUnique({
      where: {
        id: tweetId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return NextResponse.json(tweet);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
