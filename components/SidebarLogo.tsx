'use client';

import { useRouter } from 'next/navigation';
import { BsTwitter } from 'react-icons/bs';

const SidebarLogo = () => {
  const router = useRouter();

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className='
        rounded-full 
        h-14
        w-14
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-blue-300 
        hover:bg-opacity-10 
        cursor-pointer
    '
      >
        <BsTwitter size={28} color='white' />
      </div>
    </div>
  );
};

export default SidebarLogo;
