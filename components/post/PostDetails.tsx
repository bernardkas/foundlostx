import { foundPosts, lostPosts } from '@/dummyData';
import {
  Bus,
  Flag,
  MailCheck,
  MapPin,
  MessageSquare,
  Plane,
  Smartphone,
  TrainFront,
} from 'lucide-react';
import React from 'react';

const PostDetails = () => {
  const icons = [
    {
      id: 1,
      icon: <Smartphone />,
    },
    {
      id: 2,
      icon: <MailCheck />,
    },
    {
      id: 3,
      icon: <Flag />,
    },
    {
      id: 4,
      icon: <Flag />,
    },
    {
      id: 5,
      icon: <MapPin />,
    },
    {
      id: 6,
      icon: <MessageSquare />,
    },
  ];
  const allPosts = foundPosts.concat(lostPosts);
  return (
    <div className='mx-2 my-5 lg:mx-[15%]'>
      <div>posts/pristina</div>
      <div className='flex flex-row justify-center gap-5'>
        <div className='border-[1px] rounded-md w-[600px] p-2'>
          <div className='flex flex-row justify-between items-center border-b-[1px] pb-4'>
            <h1 className='text-3xl font-noto-sans font-bold'>Iphone 15</h1>
            <div className='flex gap-2 items-center'>
              <label className='bg-green-500 text-white p-1 rounded-md font-noto-sans'>
                Found
              </label>
              <label className='font-noto-sans '>27/12/2023</label>
            </div>
          </div>
          <div className='my-5 border-b-[1px] pb-2'>
            <div className='mb-2 text-lg font-noto-sans font-semibold'>
              Information
            </div>
            <div className='flex flex-col gap-2'>
              {icons.map(item => (
                <div className='flex flex-row items-center gap-1' key={item.id}>
                  <p className='text-orange-500'>{item.icon}</p>
                  <p className='font-noto-sans'>044314278</p>
                </div>
              ))}
            </div>
          </div>
          <div className='border-b-[1px] pb-2 my-5'>
            <h1 className='mb-2 text-lg font-noto-sans font-semibold'>
              Airoport
            </h1>
            <div className='flex flex-row gap-1 mb-1'>
              <p>
                <Plane className='text-orange-500' />
              </p>
              <p>Prishtine</p>
            </div>
            <div>
              <p>Number flight: </p>
            </div>
          </div>
          <div className='border-b-[1px] pb-2 my-5'>
            <h1 className='mb-2 text-lg font-noto-sans font-semibold'>Buss</h1>
            <div className='flex flex-row gap-1'>
              <p>
                <Bus className='text-orange-500' />
              </p>
              <p> 116</p>
            </div>
          </div>
          <div className=' my-5'>
            <h1 className='mb-2 text-lg font-noto-sans font-semibold'>Train</h1>
            <div className='flex flex-row gap-1'>
              <p>
                <TrainFront className='text-orange-500' />
              </p>
              <p> 116</p>
            </div>
          </div>
        </div>
        <div className=''>right</div>
      </div>
    </div>
  );
};

export default PostDetails;
