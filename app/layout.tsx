import Sidebar from '@/layouts/Sidebar';
import './globals.css';
import FollowBar from '@/layouts/FollowBar';
import { Toaster } from 'react-hot-toast';
import { NextAuthProvider } from './providers';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import EditModal from '@/components/modals/EditModal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />
      <body>
        {' '}
        <div className='h-screen bg-black'>
          <div className='container h-full mx-auto xl:px-30 max-w-6xl'>
            <div className='grid grid-cols-4 h-full'>
              <NextAuthProvider>
                <Sidebar />
                <div
                  className='
              col-span-3 
              lg:col-span-2 
              border-x-[1px] 
              border-neutral-800
          '
                >
                  {children}
                </div>
                <Toaster />
                <FollowBar />
                <LoginModal />
                <RegisterModal />
                <EditModal />
              </NextAuthProvider>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
