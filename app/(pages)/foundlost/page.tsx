import FoundLostForm from '@/components/foundlost/FoundLostForm';
import { auth } from "@clerk/nextjs/server";
import React from 'react';

const FoundLost = () => {
  const { userId } = auth();
  return (
    <div>
      <FoundLostForm userId={userId} />
    </div>
  );
};

export default FoundLost;
