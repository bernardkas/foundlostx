import { Copyright } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className='bg-slate-800 '>
      <div className='mx-2 lg:mx-[15%] bottom-0'>
        <div className=' flex flex-row justify-around items-center flex-wrap py-16'>
          <div>
            <h1 className='font-noto-sans text-lg font-semibold mb-1 text-white'>
              Information
            </h1>
            <div className='flex flex-col'>
              <Link href='/aboutus' className=' font-noto-sans text-white'>
                About us
              </Link>
              <Link href='contactus' className=' font-noto-sans text-white'>
                Contact us
              </Link>
            </div>
          </div>
          <div className='flex flex-col'>
            <Link href='/terms' className=' font-noto-sans text-white'>
              Terms & Conditions
            </Link>
            <Link href='/privacy' className=' font-noto-sans text-white'>
              Privacy Policy
            </Link>
          </div>
          <div></div>
        </div>
        <p className='flex items-center gap-2 pb-2 font-noto-sans border-t-[1px] border-orange-400 p-2 text-white'>
          <Copyright size={18} className='' /> foundlostx, 2023, by{' '}
          <Link href='https://www.waxo.tech' target='_blank'>
            Waxo
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
