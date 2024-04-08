import { cn } from '@/lib/utils';
import React from 'react';

interface EmptyData {
  classname?: string;
}

const Empty = ({ classname }: EmptyData) => {
  return (
    <div
      className={cn(
        `flex justify-center items-center h-[100px] border-[1px] my:2 lg:my-10 rounded-md`,
        classname
      )}>
      <div className=''>
        <h3>No results found</h3>
      </div>
    </div>
  );
};

export default Empty;
