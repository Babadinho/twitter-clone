import Header from '@/components/Header';
import Form from '@/components/Form';
import TweetFeed from '@/components/tweets/TweetFeed';

export default function Home() {
  return (
    <>
      <Header label='Home' />
      <Form placeholder="What's happening?" />
      <TweetFeed />
    </>
  );
}
