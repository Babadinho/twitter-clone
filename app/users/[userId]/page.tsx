'use client';

import React from 'react';
import { ClipLoader } from 'react-spinners';

import useUser from '@/hooks/useUser';

import Header from '@/components/Header';
import UserHero from '@/components/user/UserHero';
import UserBio from '@/components/user/UserBio';

const UserView = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.user.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
    </>
  );
};

export default UserView;
