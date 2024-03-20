import React from 'react';
import { Combobox } from '../ui/combobox';
import { formattedAirports } from '@/lib/defaultData';
import { Input } from '../ui/input';
import { LostAndFound } from '@prisma/client';

interface WhereDidFindItProps {
  input: any;
  handleInputChange: (a: any, b: any) => void;
  setAiroport: (a: any) => void;
  airoport: any;
}

const WhereDidFindIt = ({
  input,
  handleInputChange,
  airoport,
  setAiroport,
}: WhereDidFindItProps) => {
  const handleAiroportChange = (fieldName: string, fieldValue: any) => {
    setAiroport({ ...airoport, [fieldName]: fieldValue });
  };
  return (
    <div>
      {input.whereDidFind === 'airoport' && (
        <div className='border p-2 rounded-md border-cyan-500'>
          <div className='flex flex-col'>
            <label htmlFor=''>*Airoport name</label>
            <Combobox
              frameworks={formattedAirports}
              className='w-96 outline-none text-base font-noto-sans'
              setValue={value => handleAiroportChange('airoportName', value)}
              value={airoport.airoportName}
              placeholder=''
            />
          </div>
          <div className=''>
            <label htmlFor=''>Airline Name</label>
            <Input
              onChange={value =>
                handleAiroportChange('airlineName', value.target.value)
              }
              value={airoport.airlineName}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
          <div className=''>
            <label htmlFor=''>Flight Number</label>
            <Input
              onChange={value =>
                handleAiroportChange('flightNumber', value.target.value)
              }
              value={airoport.flightNumber}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
        </div>
      )}
      {input.whereDidFind === 'bus' && (
        <div className='border p-2 rounded-md border-cyan-500'>
          <div className=''>
            <label htmlFor=''>*Bus Station Name</label>
            <Input
              onChange={value => handleInputChange('title', value.target.value)}
              value={input.title}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
          <div className=''>
            <label htmlFor=''>Bus Route Number</label>
            <Input
              onChange={value => handleInputChange('title', value.target.value)}
              value={input.title}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
        </div>
      )}
      {input.whereDidFind === 'train' && (
        <div className='border relative p-2 rounded-md border-cyan-500'>
          <div className=''>
            <label htmlFor=''>*Train Station Name</label>
            <Input
              onChange={value => handleInputChange('title', value.target.value)}
              value={input.title}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
          <div className=''>
            <label htmlFor=''>Train Number or Name</label>
            <Input
              onChange={value => handleInputChange('title', value.target.value)}
              value={input.title}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WhereDidFindIt;
