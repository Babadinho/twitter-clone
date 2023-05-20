import { NextResponse, NextRequest } from 'next/server';

import serverAuth from '@/libs/serverAuth';
import prisma from '@/libs/prismadb';

export async function PATCH(req: Request) {
  let json = await req.json();
  const { currentUser } = await serverAuth();

  try {
    const { name, username, bio, profileImage, coverImage } = json;

    if (!name || !username) {
      throw new Error('Missing fields');
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(error);
  }
}
