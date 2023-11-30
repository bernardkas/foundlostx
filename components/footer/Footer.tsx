import { Copyright } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <div className='mx-2 lg:mx-[15%]'>
      <div className=' flex flex-row justify-around flex-wrap my-16'>
        <div>
          <h1 className='font-noto-sans text-lg font-semibold mb-1'>
            Information
          </h1>
          <p className='text-slate-700 font-noto-sans'>About us</p>
          <p className='text-slate-700 font-noto-sans'>Contact us</p>
          <p className='text-slate-700 font-noto-sans'>Solution</p>
        </div>
        <div>
          <p className='text-slate-700 font-noto-sans'>Terms & Conditions</p>
          <p className='text-slate-700 font-noto-sans'>Privacy Policy</p>
        </div>
        <div></div>
      </div>
      <p className='flex items-center gap-2 mb-2 font-noto-sans border-t-[1px] border-orange-400 p-2 '>
        <Copyright size={18} className='' /> foundlostx, 2023
      </p>
    </div>
  );
};

export default Footer;
