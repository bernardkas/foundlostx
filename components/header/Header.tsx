'use client';
import React, { useEffect, useState } from 'react';
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
import { getCityOptions } from '@/lib/utils';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const router = useRouter();
  const { setInput } = useSearchInputState();

  const [tempInput, setTempInput] = useState({
    desc: '',
    country: '',
    city: '',
    whereDidFind: '',
  });

  // const handleInputChange = (fieldName: string, fieldValue: string) => {
  //   setInput({ [fieldName]: fieldValue });
  // };

  const handleInputChange = (fieldName: string, fieldValue: string) => {
    setTempInput(prevState => ({ ...prevState, [fieldName]: fieldValue }));
  };

  const citi = getCityOptions(tempInput.country);

  const handleSearch = (city: string) => {
    if (
      tempInput.country === '' ||
      tempInput.city === '' ||
      tempInput.whereDidFind === ''
    ) {
      toast(
        'You need to fill value (Country, City, Where did you lost/find item',
        { type: 'error' }
      );

      return;
    }

    setInput({
      desc: tempInput.desc,
      country: tempInput.country,
      city: tempInput.city,
      whereDidFind: tempInput.whereDidFind,
    });

    router.push(`/posts/${city}`);

    setTempInput({
      desc: '',
      country: '',
      city: '',
      whereDidFind: '',
    });
  };

  return (
    <div className='h-[50vh]  w-full'>
      <div className='flex flex-col items-center justify-center h-full mt-4 md:mt-0'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-3xl mt-16 md:mt-0 md:text-4xl font-golos-text font-bold text-slate-600 mb-2 text-center'>
            Did you lose something?
          </h1>
          <p className='mb-12 font-golos-text  text-slate-500'>
            Search what you lost here !!
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2  justify-center gap-3 border-[1px] m-1 border-orange-400 p-[20px] rounded-md'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Input
                    className='border-[1px]  pb-1 outline-none w-[350px] font-golos-text text-base'
                    placeholder='Describe what you lose...'
                    onChange={val =>
                      handleInputChange('desc', val.target.value)
                    }
                    value={tempInput.desc}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Leave it empty if you want to show all lost and found items
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Select
              onValueChange={val => handleInputChange('whereDidFind', val)}
              value={tempInput.whereDidFind}>
              <SelectTrigger className=' border-[1px] pb-1 outline-none w-[350px]  font-golos-text text-base'>
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
            <Combobox
              frameworks={countryData}
              className=' border-[1px] pb-1 outline-none w-[350px]  font-golos-text text-base'
              placeholder='*Country...'
              setValue={value => handleInputChange('country', value)}
              value={tempInput.country}
            />
            <Combobox
              frameworks={citi}
              className='  border-[1px] pb-1 outline-none w-[350px]  font-golos-text text-base'
              placeholder='*City...'
              setValue={value => handleInputChange('city', value)}
              value={tempInput.city}
            />

            <div></div>
            <button
              onClick={() => handleSearch(tempInput.city)}
              className='ml-2 bg-orange-500 text-white p-2 rounded-lg w-full '>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
