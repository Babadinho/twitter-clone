import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/libs/prismadb';
import { authOptions } from '@/libs/auth';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  try {
    if (!session?.user?.email) {
      throw new Error('Not signed in');
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    return NextResponse.json({
      authenticated: !!session,
      currentUser,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
