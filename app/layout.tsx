import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
require('dotenv').config();
import { ClerkProvider } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import GoogleAnalytics from '@/components/GoogleAnalytics/GoogleAnalytic';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'foundlostx',
  description: 'Find everything',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId }: { userId: string | null } = auth();
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
            <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          ) : null}
          <Navbar userId={userId} />
          {children}
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
