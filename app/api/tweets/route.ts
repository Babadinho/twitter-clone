import { NextRequest, NextResponse } from 'next/server';

import serverAuth from '@/libs/serverAuth';
import prisma from '@/libs/prismadb';

export async function POST(req: Request) {
  try {
    const { currentUser } = await serverAuth();
    const { body } = await req.json();
    const tweet = await prisma.tweet.create({
      data: {
        body,
        userId: currentUser.id,
      },
    });
    return NextResponse.json(tweet);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');
    let tweets;
    if (userId && typeof userId === 'string') {
      tweets = await prisma.tweet.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      tweets = await prisma.tweet.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
    return NextResponse.json(tweets);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
