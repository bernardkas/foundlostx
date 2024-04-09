'use client';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from 'antd';
import React, { useState } from 'react';

interface MobileFilterProps {
  openModal: boolean;
  setOpenModal: (a: boolean) => void;
}

const MobileFilter = ({ openModal, setOpenModal }: MobileFilterProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  return (
    <div>
      <Modal
        className=' w-[450px] m-2'
        isOpen={openModal}
        onClose={() => setOpenModal(false)}>
        <div className='flex flex-col gap-3  '>
          <h1>Filter</h1>
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
          </div>
        </div>
        <div className='flex flex-row justify-end mt-2'>
          <Button
            variant='default'
            className='bg-orange-500 text-white font-noto-sans text-base hover:bg-orange-600'>
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default MobileFilter;
