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
import { englandCity, countryData, whereDidYouFindIt } from '@/lib/defaultData';
import { useSearchInputState } from '@/lib/store';
import { toast } from 'react-toastify';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const router = useRouter();

  const handleGoToCity = () => {
    router.push('/posts/pristina');
  };

  const { desc, country, city, whereDidFind, setInput } = useSearchInputState();

  const handleInputChange = (fieldName: string, fieldValue: string) => {
    setInput({ [fieldName]: fieldValue });
  };

  console.log('input', { desc, country, city, whereDidFind });

  const handleSearch = (city: string) => {
    if (country === '' || city === '' || whereDidFind === '') {
      toast.error(
        'You need to fill value (Country, City, Where did you lost/find item)'
      );
      return;
    }

    router.push(`/posts/${city}`);
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
          <div className='flex flex-row flex-wrap justify-center gap-3 md:gap-0 border-[1px] m-1 border-orange-400 p-5 rounded-md px-2'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Input
                    className='border-t-0 border-l-0 border-r-0 border-b-[1px]  pb-1 outline-none w-[350px] lg:w-[250px] font-golos-text text-base'
                    placeholder='Describe what you lose...'
                    onChange={val =>
                      handleInputChange('desc', val.target.value)
                    }
                    value={desc}
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
              frameworks={countryData}
              className=' border-t-0 border-l-0 border-r-0 border-b-[1px] pb-1 outline-none w-[350px] lg:w-[250px] font-golos-text text-base'
              placeholder='*Country...'
              setValue={value => handleInputChange('country', value)}
              value={country}
            />
            <Combobox
              frameworks={englandCity}
              className=' border-t-0 border-l-0 border-r-0 border-b-[1px] pb-1 outline-none w-[350px] lg:w-[250px] font-golos-text text-base'
              placeholder='*City...'
              setValue={value => handleInputChange('city', value)}
              value={city}
            />
            <Select
              onValueChange={val => handleInputChange('whereDidFind', val)}
              value={whereDidFind}>
              <SelectTrigger className='border-t-0 border-l-0 border-r-0 border-b-[1px] pb-1 outline-none w-[350px] lg:w-[250px] font-golos-text text-base'>
                <SelectValue placeholder='*Where did you lost/find item?' />
              </SelectTrigger>
              <SelectContent>
                {whereDidYouFindIt.map(item => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              onClick={() => handleSearch(city)}
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
