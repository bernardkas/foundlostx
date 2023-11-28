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
  return (
    <div className='h-[50vh]  w-full'>
      <div className='flex flex-col items-center justify-center h-full'>
        <div className='flex flex-col items-center'>
          <h1 className='text-4xl font-golos-text font-bold text-slate-600 mb-2'>
            Did you lose something?
          </h1>
          <p className='mb-12 font-golos-text  text-slate-500'>
            Search what you lost here !!
          </p>
          <div className='flex flex-row flex-wrap border-[1px] border-orange-400 p-5 rounded-md px-2'>
            <Input
              className='border-b-[1px] pb-1 outline-none w-[250px] font-golos-text text-base'
              placeholder='Descripe what you lost...'
            />

            <Combobox
              frameworks={frameworks}
              className=' border-b-[1px] pb-1 outline-none w-[250px] font-golos-text text-base'
              placeholder='Country...'
            />
            <Combobox
              frameworks={frameworks}
              className=' border-b-[1px] pb-1 outline-none w-[250px] font-golos-text text-base'
              placeholder='City...'
            />
            <Select>
              <SelectTrigger className='border-b-[1px] pb-1 outline-none w-[250px] font-golos-text text-base'>
                <SelectValue placeholder='Where did you lose item?' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='light'>Airport</SelectItem>
                <SelectItem value='dark'>Train</SelectItem>
                <SelectItem value='dark'>Bus Station</SelectItem>
                <SelectItem value='system'>Somwhere in the city</SelectItem>
              </SelectContent>
            </Select>
            <button className='ml-2 bg-orange-500 text-white p-2 rounded-lg w-[100px]'>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
