import { Copyright, Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '@/assets/no-bg.png';

const Footer = () => {
  return (
    <div className='bg-[#272532] '>
      <div className='mx-2 lg:mx-[15%] bottom-0'>
        <div className=' flex flex-row justify-around items-start flex-wrap py-16 gap-6 md:gap-0'>
          <div className='w-auto md:w-[250px]'>
            <h1 className='font-noto-sans text-orange-500 uppercase text-2xl mb-2'>
              foundlostx
            </h1>
            <p className=' text-gray-400 mb-3'>
              Lost but not forgotten, found with ease. Join FoundLostX and
              reunite with your belongings effortlessly
            </p>
            <p className='flex flex-row gap-4'>
              <Link
                href='https://www.facebook.com/profile.php?id=61558843149840'
                target='_blank'
                className='cursor-pointer'>
                <Facebook className='text-blue-400' />
              </Link>
              <Link href='' className='cursor-pointer'>
                <Instagram className='text-red-500' />
              </Link>
            </p>
          </div>
          <div className='w-[200px]'>
            <div className='flex flex-col gap-2'>
              <Link className='font-noto-sans text-white' href='/price'>
                Price
              </Link>
              <Link className='font-noto-sans text-white' href='/foundlost'>
                Items you lost or find
              </Link>
              <Link href='/aboutus' className=' font-noto-sans text-white'>
                About us
              </Link>
              <Link href='contactus' className=' font-noto-sans text-white'>
                Contact us
              </Link>
              <Link href='/terms' className=' font-noto-sans text-white'>
                Terms & Conditions
              </Link>
              <Link href='/privacy' className=' font-noto-sans text-white'>
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className='flex flex-col gap-2 text-white w-[200px]'>
            <h2 className='font-noto-sans'>Contact Us</h2>
            <p className='text-[15px] font-noto-sans'>
              Email: infowaxo@gmail.com
            </p>
            <p className='text-[15px] font-noto-sans'>
              Address: Str: Brigada, Podujevo
            </p>
          </div>
        </div>
        <p className='flex items-center gap-2 pb-2 font-noto-sans border-t-[1px] border-orange-400 p-2 text-white'>
          <Copyright size={18} className='' /> foundlostx, 2024, by{' '}
          <Link href='https://www.waxo.tech' target='_blank'>
            waxo
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
