'use client';
import React, { useState } from 'react';
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
import CustomUpload from '../ui/upload';
import { DatePicker } from '../ui/dataPicker';

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
  const handleChange = info => {
    // Handle file change logic if needed
    console.log(info.fileList);
  };
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleDateSelect = (date: Date) => {
    // Handle the selected date
    setSelectedDate(date);
  };

  const [airoplanInput, setAiroplanInput] = useState(false);

  console.log('airoplane', airoplanInput);

  const [selectedLocation, setSelectedLocation] = useState('');
  const handleLocationSelect = value => {
    setSelectedLocation(value);
  };

  console.log('selecte', selectedLocation);

  return (
    <div className='w-full my-16 flex items-center justify-center'>
      <div className='mx-2 lg:mx-[15%] flex flex-col items-left justify-center gap-5 '>
        <div>
          <h1 className='text-3xl font-noto-sans mb-3 font-semibold text-green-400 border-b-[2px] border-green-500'>
            Found
          </h1>
          <p>
            Did you found something. Greate you can give information below and
            describe what you found.
          </p>
        </div>
        <div className='flex flex-row flex-wrap gap-5'>
          <div>
            <label htmlFor=''>*Name</label>
            <Input className=' w-96 outline-none text-base font-noto-sans' />
          </div>
          <div>
            <label htmlFor=''>Lastname</label>
            <Input className='w-96 outline-none text-base font-noto-sans' />
          </div>
        </div>
        <div className='flex flex-row flex-wrap gap-5'>
          <div>
            <label htmlFor=''>*Phone</label>
            <Input className='w-96 outline-none text-base font-noto-sans' />
          </div>
          <div>
            <label htmlFor=''>Email</label>
            <Input className='w-96 outline-none text-base font-noto-sans' />
          </div>
        </div>
        <div className=''>
          <label htmlFor=''>*Title</label>
          <Input className='w-96 lg: outline-none text-base font-noto-sans' />
        </div>
        <div className='flex flex-row flex-wrap gap-5'>
          <div className='flex flex-col'>
            <label htmlFor=''>*Country</label>
            <Combobox
              frameworks={frameworks}
              className='w-96 outline-none text-base font-noto-sans'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor=''>*City</label>
            <Combobox
              frameworks={frameworks}
              className='w-96 outline-none text-base font-noto-sans'
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <label htmlFor=''>*Where did you find it?</label>
          <Select>
            <SelectTrigger className='border-[1px] pb-1 outline-none w-96 font-golos-text text-base'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                onClick={() => handleLocationSelect('airport')}
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
        {airoplanInput && (
          <div className='flex flex-row flex-wrap gap-5'>
            <div>
              <label htmlFor=''>Airoplan</label>
              <Input className=' w-96 outline-none text-base font-noto-sans' />
            </div>
            <div>
              <label htmlFor=''>Number flight</label>
              <Input className='w-96 outline-none text-base font-noto-sans' />
            </div>
          </div>
        )}
        <div className='flex flex-col'>
          <label htmlFor=''>
            *Provide details about the specific location where you discovered
            it.
          </label>
          <Textarea className='text-base font-noto-sans w-96 lg:w-2/3' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor=''>*Can you please describe the item you found?</label>
          <Textarea className='text-base font-noto-sans w-96 lg:w-2/3' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor=''>*What day you find it?</label>
          <DatePicker
            selectedDate={selectedDate}
            onSelectDate={handleDateSelect}
            placeholder='Select your date'
          />
        </div>
        <div>
          <label htmlFor=''>*Please upload a photo here</label>
          <CustomUpload onChange={handleChange} />
        </div>
        <Button className='bg-orange-500 text-base hover:bg-orange-700'>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FoundForm;
