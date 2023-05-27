import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import useCurrentUser from './useCurrentUser';
import useLoginModal from './useLoginModal';
import useTweet from './useTweet';
import useTweets from './useTweets';

const useLike = ({ tweetId, userId }: { tweetId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedTweet, mutate: mutateFetchedTweet } = useTweet(tweetId);
  const { mutate: mutateFetchedTweets } = useTweets(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedTweet?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [fetchedTweet, currentUser]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete(`/api/like/?tweetId=${tweetId}`);
      } else {
        request = () => axios.post('/api/like', { tweetId });
      }

      await request();
      mutateFetchedTweet();
      mutateFetchedTweets();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [
    currentUser,
    hasLiked,
    tweetId,
    mutateFetchedTweet,
    mutateFetchedTweets,
    loginModal,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
