// components/ui/Combobox.tsx
import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from './button'; // Update the import path as needed
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
}

export const Combobox: React.FC<ComboboxProps> = ({
  frameworks,
  className,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='default'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'justify-between bg-white text-black hover:bg-white font-normal',
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
      <PopoverContent className='w-auto p-0'>
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
                  setValue(currentValue === value ? '' : currentValue);
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
