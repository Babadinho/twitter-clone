'use client';
import { ClipLoader } from 'react-spinners';

import useTweet from '@/hooks/useTweet';

import Header from '@/components/Header';
import Form from '@/components/Form';
import TweetItem from '@/components/tweets/TweetItem';

const TweetView = ({ params }: { params: { tweetId: string } }) => {
  const { tweetId } = params;

  const { data: fetchedTweet, isLoading } = useTweet(tweetId as string);

  if (isLoading || !fetchedTweet) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label='Tweet' />
      <TweetItem data={fetchedTweet} />
      <Form
        tweetId={tweetId as string}
        isComment
        placeholder='Tweet your reply'
      />
    </>
  );
};

export default TweetView;
