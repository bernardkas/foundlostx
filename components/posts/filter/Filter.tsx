'use client';
import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { DatePicker } from '../../ui/dataPicker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MobileFilter from './MobileFilter';
import Modal from '@/components/ui/modal';

interface FilterProps {
  desc: string;
  country: string;
  city: string;
  whereDidFind: string;
  foundOrLost: string;
  setFoundOrLost: (val: string) => void;
}

const Filter = ({
  desc,
  country,
  city,
  whereDidFind,
  foundOrLost,
  setFoundOrLost,
}: FilterProps) => {
  const [openModal, setOpenModal] = useState(false);
  // const [selectedDate, setSelectedDate] = useState<Date>();
  // const handleDateSelect = (date: any) => {
  //   setDateFilter(date);
  // };
  return (
    <>
      <div className='my-10 w-auto md:w-[300px] hidden lg:block'>
        <div>
          <div className='flex flex-col gap-3  '>
            <div className='flex flex-col gap-1 border-[1px] p-2 rounded-md'>
              <h3 className='font-noto-sans text-base'>What you search</h3>
              <p className='text-sm font-noto-sans text-slate-500'>
                Description: {desc}
              </p>
              <p className='text-sm font-noto-sans text-slate-500'>
                Country: {country}
              </p>
              <p className='text-sm font-noto-sans text-slate-500'>
                City: {city}
              </p>
              <p className='text-sm font-noto-sans text-slate-500'>
                Where did you lose/find item: {whereDidFind}
              </p>
            </div>
            <div className='border-[1px] p-2 rounded-md flex flex-col gap-4'>
              <div>
                <RadioGroup
                  onValueChange={val => setFoundOrLost(val)}
                  defaultValue='all'
                  value={foundOrLost}>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='all' id='r1' />
                    <label htmlFor='r1'>All</label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='found' id='r2' />
                    <label htmlFor='r2'>Found</label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='lost' id='r3' />
                    <label htmlFor='r3'>Lost</label>
                  </div>
                </RadioGroup>
              </div>
              {/* <div>
                <label htmlFor=''>What day you find it?</label>
                <DatePicker
                  selectedDate={dateFilter}
                  onSelectDate={handleDateSelect}
                  placeholder='Select your date'
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className='block lg:hidden'>
        <div className='flex flex-row justify-end my-4'>
          <p
            className='cursor-pointer  text-base bg-stone-300 p-2 rounded-md '
            onClick={() => setOpenModal(true)}>
            Filter
          </p>
        </div>
        <MobileFilter setOpenModal={setOpenModal} openModal={openModal} />
      </div>
    </>
  );
};

export default Filter;
