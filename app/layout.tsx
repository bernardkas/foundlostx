import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
require('dotenv').config();
import { ClerkProvider } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'foundlostx',
  description: 'Find everything',
  keywords: [
    'Lost items',
    'Found possessions',
    'Lost and found',
    'Swift retrieval',
    'User-friendly interface',
    'Detailed descriptions',
    'Image upload',
    'Successful recovery',
    'Robust search',
    'Advanced algorithms',
    'Efficient sifting',
    'Match criteria',
    'Lost pet',
    'Misplaced electronic device',
    'Found jewelry',
    'Search capabilities',
    'Privacy protection',
    'Security measures',
    'Personal information',
    'Encryption techniques',
    'Peace of mind',
    'Reuniting community',
    'Managing possessions',
    'Centralized platform',
    'Lost items management',
    'Found items documentation',
    'Swift identification',
    'Secure platform',
    'Lost items privacy',
    'Found items security',
    'Items recovery',
    'Efficient search',
    'Identification process',
    'Lost items tracking',
    'Found items tracking',
    'Assistance community',
    'Items directory',
    'Items inventory',
    'Items catalogue',
    'Finder tool',
    'Recovery service',
    'Seamless management',
    'Documenting process',
    'Successful retrieval',
    'Privacy assurance',
    'Security protocols',
    'Lost property',
    'Found treasures',
    'Swift recovery',
    'Reliable assistance',
  ],
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
        <head>
          <meta
            name='google-site-verification'
            content='Q7WO4v_yuPUJPttWgL9f6r-Hqzy6es0TkopmP52c2_s'
          />
        </head>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!} />
        <body className={inter.className}>
          <Navbar userId={userId} />
          {children}
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
