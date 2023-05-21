'use client';

import useTweets from '@/hooks/useTweets';
import TweetItem from './TweetItem';

interface TweetFeedProps {
  userId?: string;
}

const TweetFeed = ({ userId }: TweetFeedProps) => {
  const { data: tweets = [] } = useTweets(userId);

  return (
    <>
      {tweets &&
        tweets.length > 0 &&
        tweets.map((post: Record<string, any>) => (
          <TweetItem userId={userId} key={post.id} data={post} />
        ))}
    </>
  );
};

export default TweetFeed;
