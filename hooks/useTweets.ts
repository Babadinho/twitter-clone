import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useTweets = (userId?: string) => {
  const url = userId ? `/api/tweets?userId=${userId}` : '/api/tweets';
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useTweets;
