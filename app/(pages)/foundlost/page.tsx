import LostForm from '@/components/foundlost/FoundLostForm';
import { auth } from '@clerk/nextjs';
import React from 'react';

const FoundLost = () => {
  const { userId } = auth();
  if (!userId) {
    return console.log('You need user id');
  }
  return (
    <div>
      <LostForm userId={userId} />
    </div>
  );
};

export default FoundLost;
