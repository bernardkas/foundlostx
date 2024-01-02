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
import MapLost from '../map/MapLost';
import { city } from '@/lib/defaultData';
import { FoundLostItems } from '@/lib/interface';
import axios from 'axios';

const FoundLostForm = () => {
  const initialPosts: FoundLostItems[] = [];
  const [selectedDate, setSelectedDate] = useState<Date>();

  const [input, setInput] = useState({
    name: '',
    lastname: '',
    phone: '',
    email: '',
    title: '',
    city: '',
    whereDidFind: '',
    exatLocation: '',
    description: '',
    findingDate: '',
    mapAddress: '',
    label: '',
    photo: [],
  });

  // ? To implemnet photos logic
  // const handleChange = (info: any) => {
  //   console.log(info.fileList);
  // };
  // const handleDateSelect = (date: Date) => {
  //   setSelectedDate(date);
  // };

  const createForm = async () => {
    try {
      const data = await axios.post('/api/foundlost', {
        ...input,
      });

      if (data.status === 200) {
        console.log('Created successfully');
      } else {
        console.log('not created');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (fieldName: string, fieldValue: any) => {
    setInput({ ...input, [fieldName]: fieldValue });
  };

  console.log('inpur', input);

  return (
    <div className='w-full my-16 flex items-center justify-center'>
      <div className='mx-2 lg:mx-[15%] flex flex-col items-left justify-center gap-5 '>
        <div className='w-full md:w-[800px]'>
          <h1
            className={`text-3xl font-noto-sans mb-3 font-semibold ${
              input.label === 'found'
                ? 'text-green-400 border-b-[2px] border-green-500'
                : 'text-red-400 border-b-[2px] border-red-500'
            } `}>
            {input.label === 'found' ? 'Found' : 'Lost'}
          </h1>
          {input.label === 'found' ? (
            <p>
              Did you found something. Greate you can give information below and
              describe what you found.
            </p>
          ) : (
            <p>
              Did you lost something. Ufff bad day but we are here for you, you
              can give information below and describe what you lost.
            </p>
          )}
        </div>
        <div>
          <label htmlFor=''>*Items status</label>
          <Select
            onValueChange={value => handleInputChange('label', value)}
            value={input.label}>
            <SelectTrigger className='border-[1px] pb-1 outline-none w-96 font-golos-text text-base'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='lost'>Lost</SelectItem>
              <SelectItem value='found'>Found</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-row flex-wrap gap-5'>
          <div>
            <label htmlFor=''>*Name</label>
            <Input
              onChange={value => handleInputChange('name', value.target.value)}
              value={input.name}
              className=' w-96 outline-none text-base font-noto-sans'
            />
          </div>
          <div>
            <label htmlFor=''>Lastname</label>
            <Input
              onChange={value =>
                handleInputChange('lastname', value.target.value)
              }
              value={input.lastname}
              name='lastname'
              className='w-96 outline-none text-base font-noto-sans'
            />
          </div>
        </div>
        <div className='flex flex-row flex-wrap gap-5'>
          <div>
            <label htmlFor=''>*Phone</label>
            <Input
              onChange={value => handleInputChange('phone', value.target.value)}
              value={input.phone}
              name='phone'
              className='w-96 outline-none text-base font-noto-sans'
            />
          </div>
          <div>
            <label htmlFor=''>Email</label>
            <Input
              onChange={value => handleInputChange('email', value.target.value)}
              value={input.email}
              name='email'
              className='w-96 outline-none text-base font-noto-sans'
            />
          </div>
        </div>
        <div className=''>
          <label htmlFor=''>*Title</label>
          <Input
            onChange={value => handleInputChange('title', value.target.value)}
            value={input.title}
            name='title'
            className='w-96 lg: outline-none text-base font-noto-sans'
          />
        </div>
        <div className='flex flex-row flex-wrap gap-5'>
          <div className='flex flex-col'>
            <label htmlFor=''>*City</label>
            <Combobox
              frameworks={city}
              className='w-96 outline-none text-base font-noto-sans'
              setValue={value => handleInputChange('city', value)}
              value={input.city}
              placeholder='Select a city'
            />
          </div>
        </div>
        <div className='flex flex-col'>
          {input.label === 'found' ? (
            <label htmlFor=''>*Where did you find it?</label>
          ) : (
            <label htmlFor=''>*Where did you lose it?</label>
          )}

          <Select
            onValueChange={value => handleInputChange('whereDidFind', value)}
            value={input.whereDidFind}>
            <SelectTrigger className='border-[1px] pb-1 outline-none w-96 font-golos-text text-base'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='airport'>Airport</SelectItem>
              <SelectItem value='bus'>Bus Station</SelectItem>
              <SelectItem value='hotel'>Hotel</SelectItem>
              <SelectItem value='city'>Somwhere in the city</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col'>
          {input.label === 'found' ? (
            <label htmlFor=''>
              *Provide details about the specific location where you find it.
            </label>
          ) : (
            <label htmlFor=''>
              *Provide details about the specific location where you lost it.
            </label>
          )}
          <Textarea
            onChange={value =>
              handleInputChange('exatLocation', value.target.value)
            }
            value={input.exatLocation}
            className='text-base font-noto-sans w-96 lg:w-2/3'
          />
        </div>
        <div className='flex flex-col'>
          {input.label === 'found' ? (
            <label htmlFor=''>
              *Can you please describe the item you find?
            </label>
          ) : (
            <label htmlFor=''>
              *Can you please describe the item you lost?
            </label>
          )}
          <Textarea
            onChange={value =>
              handleInputChange('description', value.target.value)
            }
            value={input.description}
            className='text-base font-noto-sans w-96 lg:w-2/3'
          />
        </div>
        <div className='flex flex-col'>
          {input.label === 'found' ? (
            <label htmlFor=''>*What day you find it?</label>
          ) : (
            <label htmlFor=''>*What day you losted?</label>
          )}
          <DatePicker
            // selectedDate={input.findingDate}
            onSelectDate={value => handleInputChange('findingDate', value)}
            placeholder='Select your date'
          />
        </div>
        {/* To be implemented in the future */}
        {/* <div className='relative'>
          {input.label === 'found' ? (
            <label htmlFor=''>Select address where did you find it?</label>
          ) : (
            <label htmlFor=''>Select address where did you lost it?</label>
          )}
          <MapLost
            onChange={value => handleInputChange('mapAddress', value.words)}
          />
        </div> */}
        <div>
          <label htmlFor=''>*Please upload a photo here</label>
          <CustomUpload onChange={value => handleInputChange('photo', value)} />
        </div>
        <Button
          onClick={createForm}
          className='bg-orange-500 text-base hover:bg-orange-700'>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FoundLostForm;
