import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { cn } from '@/lib/utils';

interface Framework {
  value: string;
  label: string;
}

interface ComboboxProps {
  frameworks: Framework[];
  className?: string;
  placeholder?: string;
  setValue: (value: any) => void;
  value: string; // Added the 'value' prop
}

export const Combobox: React.FC<ComboboxProps> = ({
  frameworks,
  className,
  placeholder,
  setValue,
  value, // Added the 'value' prop
}) => {
  const [open, setOpen] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(0);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setButtonWidth(event.currentTarget.offsetWidth);
    setOpen(!open);
  };


  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger asChild>
        <Button
          onClick={handleButtonClick}
          variant='default'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'justify-between border-[1px] bg-white text-black hover:bg-white font-normal',
            className
          )}>
          <span
            className={cn(
              'placeholder-opacity-50',
              value ? 'opacity-100' : 'opacity-80'
            )}>
            {value
              ? frameworks.find(framework => framework.value === value)?.label
              : placeholder}
          </span>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{ width: `${buttonWidth}px` }}
        className='w-auto p-0'>
        <Command>
          <CommandInput placeholder='...' />
          <CommandEmpty>No Country found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map(framework => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                className='cursor-pointer w-full'
                onSelect={currentValue => {
                  setValue(currentValue === value ? '' : currentValue); // Call the onChange prop with the selected value
                  setOpen(false);
                }}>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === framework.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
