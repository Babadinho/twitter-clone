import Sidebar from '@/layouts/Sidebar';
import './globals.css';
import FollowBar from '@/components/FollowBar';
import Modal from '@/components/Modal';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';

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
              <FollowBar />
              <LoginModal />
              <RegisterModal />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
