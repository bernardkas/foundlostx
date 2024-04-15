import LostForm from '@/components/foundlost/FoundLostForm';
import { auth } from '@clerk/nextjs';
import React from 'react';

const FoundLost = () => {
  const { userId } = auth();
  return (
    <div>
      <LostForm />
    </div>
  );
};

export default FoundLost;
