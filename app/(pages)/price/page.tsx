import PriceComponent from '@/components/price/PriceComponent';
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs';
import { Check, ChevronRight } from 'lucide-react';
import React from 'react';

const Price = () => {
  const { userId } = auth();
  return (
    <div className=''>
      <PriceComponent userId={userId} />
    </div>
  );
};

export default Price;
