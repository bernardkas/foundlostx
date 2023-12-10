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

const Filter = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const handleDateSelect = (date: Date) => {
    // Handle the selected date
    setSelectedDate(date);
  };
  return (
    <>
      <div className='my-10 w-auto md:w-[300px] hidden lg:block'>
        <div>
          <div className='flex flex-col gap-3  '>
            <div className='flex flex-col gap-1 border-[1px] p-2 rounded-md'>
              <h3 className='font-noto-sans text-base'>What you search</h3>
              <p className='text-sm font-noto-sans text-slate-500'>
                Description: qant e krahit
              </p>
              <p className='text-sm font-noto-sans text-slate-500'>
                Country: Kosova
              </p>
              <p className='text-sm font-noto-sans text-slate-500'>
                City: Pristina
              </p>
              <p className='text-sm font-noto-sans text-slate-500'>
                Where did you lose items: Airoport
              </p>
            </div>
            <div className='border-[1px] p-2 rounded-md flex flex-col gap-4'>
              <div>
                <RadioGroup defaultValue='comfortable'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='default' id='r1' />
                    <label htmlFor='r1'>All</label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='comfortable' id='r2' />
                    <label htmlFor='r2'>Found</label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='compact' id='r3' />
                    <label htmlFor='r3'>Lost</label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <label htmlFor=''>What day you find it?</label>
                <DatePicker
                  selectedDate={selectedDate}
                  onSelectDate={handleDateSelect}
                  placeholder='Select your date'
                />
              </div>
              <div>
                <label htmlFor=''>Where did you find it</label>
                <Select>
                  <SelectTrigger className='border-[1px] pb-1 outline-none font-golos-text text-base'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      // onClick={() => handleLocationSelect('airport')}
                      value='airport'>
                      Airoport
                    </SelectItem>
                    <SelectItem value='train'>Train</SelectItem>
                    <SelectItem value='bus'>Bus Station</SelectItem>
                    <SelectItem value='hotel'>Hotel</SelectItem>
                    <SelectItem value='ferry'>Ferry</SelectItem>
                    <SelectItem value='city'>Somwhere in the city</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
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
