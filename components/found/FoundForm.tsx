'use client';
import React from 'react';
import { Input } from '../ui/input';
import { Combobox } from '../ui/combobox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const FoundForm = () => {
  const frameworks = [
    {
      value: 'next.js',
      label: 'Next.js',
    },
    {
      value: 'react',
      label: 'react',
    },
    {
      value: 'csharp',
      label: 'Csharp',
    },
  ];
  return (
    <div className='w-full my-16 flex items-center justify-center'>
      <div className='mx-2 lg:mx-[15%] flex flex-col items-left justify-center gap-5 '>
        <div className='flex flex-row flex-wrap gap-5'>
          <div>
            <label htmlFor=''>Name</label>
            <Input className=' w-96 outline-none text-base font-noto-sans' />
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
        <div className='flex flex-row flex-wrap gap-5'>
          <div className='flex flex-col'>
            <label htmlFor=''>Country</label>
            <Combobox
              frameworks={frameworks}
              className='w-96 outline-none text-base font-noto-sans'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor=''>City</label>
            <Combobox
              frameworks={frameworks}
              className='w-96 outline-none text-base font-noto-sans'
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <label htmlFor=''>Where did you find it?</label>
          <Select>
            <SelectTrigger className='border-[1px] pb-1 outline-none w-96 font-golos-text text-base'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>Airport</SelectItem>
              <SelectItem value='dark'>Train</SelectItem>
              <SelectItem value='dark'>Bus Station</SelectItem>
              <SelectItem value='system'>Somwhere in the city</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col'>
          <label htmlFor=''>
            Provide details about the specific location where you discovered it.
          </label>
          <Textarea className='text-base font-noto-sans w-96 lg:w-2/3' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor=''>Can you please describe the item you found?</label>
          <Textarea className='text-base font-noto-sans w-96 lg:w-2/3' />
        </div>
        <Button className='bg-orange-500 text-base hover:bg-orange-700'>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FoundForm;
