import Header from '@/components/Header';
import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth';

export default async function Home() {
  return (
    <>
      <Header label={'Home'} />
    </>
  );
}
