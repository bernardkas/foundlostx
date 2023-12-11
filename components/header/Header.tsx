'use client';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Combobox } from '../ui/combobox';
import { Input } from '../ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [suggestedAddresses, setSuggestedAddresses] = useState([
    'Prishtin, 17 Nentori',
    'Prishtin, 17 Shtaotri',
    'Ferizaj, 15 Nentori',
    'Prishtin, 2 Janari',
    'Prishtin, 28 Dhjetori',
    'Prishtin, 2 Janari',
    'Prishtin, 28 Dhjetori',
    'Prishtin, 2 Janari',
    'Prishtin, 28 Dhjetori',
    'Prishtin, 2 Janari',
    'Prishtin, 28 Dhjetori',
    'Prishtin, 2 Janari',
    'Prishtin, 28 Dhjetori',
  ]);
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

  const router = useRouter();

  const handleGoToCity = () => {
    router.push('/posts/pristina');
  };

  return (
    <div className='h-[50vh]  w-full'>
      <div className='flex flex-col items-center justify-center h-full'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-3xl mt-16 md:mt-0 md:text-4xl font-golos-text font-bold text-slate-600 mb-2 text-center'>
            Did you lose something?
          </h1>
          <p className='mb-12 font-golos-text  text-slate-500'>
            Search what you lost here !!
          </p>
          <div className='flex flex-row flex-wrap justify-center gap-3 md:gap-0 border-[1px] border-orange-400 p-5 rounded-md px-2'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Input
                    className='border-t-0 border-l-0 border-r-0 border-b-[1px]  pb-1 outline-none w-[350px] lg:w-[250px] font-golos-text text-base'
                    placeholder='Descripe what you lose...'
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Leave it empty if you want to show all lost and found items
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Combobox
              frameworks={frameworks}
              className=' border-t-0 border-l-0 border-r-0 border-b-[1px] pb-1 outline-none w-[350px] lg:w-[250px] font-golos-text text-base'
              placeholder='*Country...'
            />
            <Combobox
              frameworks={frameworks}
              className=' border-t-0 border-l-0 border-r-0 border-b-[1px] pb-1 outline-none w-[350px] lg:w-[250px] font-golos-text text-base'
              placeholder='*City...'
            />
            <Select>
              <SelectTrigger className='border-t-0 border-l-0 border-r-0 border-b-[1px] pb-1 outline-none w-[350px] lg:w-[250px] font-golos-text text-base'>
                <SelectValue placeholder='*Where did you lose item?' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='airport'>Airport</SelectItem>
                <SelectItem value='train'>Train</SelectItem>
                <SelectItem value='bus'>Bus Station</SelectItem>
                <SelectItem value='hotel'>Hotel</SelectItem>
                <SelectItem value='ferry'>Ferry</SelectItem>
                <SelectItem value='city'>Somwhere in the city</SelectItem>
              </SelectContent>
            </Select>
            <button
              onClick={handleGoToCity}
              className='ml-2 bg-orange-500 text-white p-2 rounded-lg w-[250px] md:w-[100px] '>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
