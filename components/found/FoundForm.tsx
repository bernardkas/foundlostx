import React from 'react';
import { Input } from '../ui/input';

const FoundForm = () => {
  return (
    <div className='w-full'>
      <div className='mx-2 lg:mx-[20%] flex flex-col items-left justify-center mt-16 '>
        <div className='flex flex-row flex-wrap gap-5'>
          <div>
            <label htmlFor=''>Name</label>
            <Input className='w-96 outline-none text-base font-noto-sans' />
          </div>
          <div>
            <label htmlFor=''>Lastname</label>
            <Input className='w-96 outline-none text-base font-noto-sans' />
          </div>
        </div>
        <div className='flex flex-row flex-wrap gap-5'>
          <div>
            <label htmlFor=''>Phone</label>
            <Input className='w-96 outline-none text-base font-noto-sans' />
          </div>
          <div>
            <label htmlFor=''>Email</label>
            <Input className='w-96 outline-none text-base font-noto-sans' />
          </div>
        </div>
        <div className=''>
          <label htmlFor=''>Title</label>
          <Input className='w-96 lg: outline-none text-base font-noto-sans' />
        </div>
      </div>
    </div>
  );
};

export default FoundForm;
