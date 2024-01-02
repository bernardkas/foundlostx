import { Loader } from 'lucide-react';
import React from 'react';

const Loading = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className=' text-white p-4 rounded shadow-md'>
        <Loader size={50} />
      </div>
    </div>
  );
};

export default Loading;
