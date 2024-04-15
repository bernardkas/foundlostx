import LostForm from '@/components/foundlost/FoundLostForm';
import { auth } from '@clerk/nextjs';
import React from 'react';

const FoundLost = () => {
  return (
    <div>
      <LostForm />
    </div>
  );
};

export default FoundLost;
