'use client';
import { UserButton, useSignIn } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { auth } from '@clerk/nextjs';
import logo from '@/assets/logo.png';
import Image from 'next/image';

interface NavbarProps {
  userId: any;
}

const Navbar = ({ userId }: NavbarProps) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className='shadow-lg '>
      <div className='mx-1 flex  h-[70px] flex-row items-center justify-between  lg:mx-[15%]'>
        <div>
          <Link
            className='font-tilt-prism text-2xl font-bold text-orange-500 h-16'
            href='/'>
            <Image src={logo} alt='' width={300} height={50} />
          </Link>
        </div>
        <div className='hidden flex-row gap-1 items-center lg:flex'>
          <Link
            className='mx-2 font-noto-sans font-[500] text-base text-gray-800'
            href='/foundlost'>
            Items you lost or find
          </Link>

          {!userId ? (
            <Link
              className='mx-2 font-noto-sans font-[500] text-base text-white bg-orange-500 p-1 rounded-sm'
              href='sign-in'>
              Login
            </Link>
          ) : (
            <>
              <Link
                className='mx-2 font-noto-sans font-[500] text-base text-gray-800'
                href='/dashboard'>
                Dashboard
              </Link>
              <UserButton afterSignOutUrl='/' />
            </>
          )}
        </div>

        <div className='block text-gray-800 lg:hidden'>
          <Menu onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} />
        </div>
      </div>
      {isMobileNavOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: '200px' }}
          transition={{ duration: 0.3 }}
          className='absolute top-0 left-0 w-full h-full bg-white shadow-lg z-50'>
          <button
            className='text-3xl text-right w-full pr-4 pt-4 text-red-400'
            onClick={() => setIsMobileNavOpen(false)}>
            X
          </button>
          <div>
            <div className=' flex flex-col items-center justify-center gap-5 '>
              <Link
                className='mx-2 font-noto-sans font-[500] text-base text-gray-800'
                href='foundlost'
                onClick={() => setIsMobileNavOpen(false)}>
                Items you lost or find
              </Link>
              {!userId ? (
                <Link
                  className='mx-2 font-noto-sans font-[500] text-base text-white bg-orange-500 p-1 rounded-sm'
                  href='sign-in'
                  onClick={() => setIsMobileNavOpen(false)}>
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    className='mx-2 font-noto-sans font-[500] text-base text-gray-800'
                    href='/dashboard'
                    onClick={() => setIsMobileNavOpen(false)}>
                    Dashboard
                  </Link>
                  <UserButton afterSignOutUrl='/' />
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
