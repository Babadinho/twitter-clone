import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return NextResponse.json({
      user: user,
      followersCount: followersCount,
    });
  } catch (error) {
    let error_response = {
      status: 'fail',
      message: 'No User with the Provided ID Found',
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
