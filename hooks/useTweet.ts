import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useTweet = (tweetId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    tweetId ? `/api/tweets/${tweetId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useTweet;
