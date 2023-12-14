import { foundPosts, lostPosts } from '@/dummyData';
import {
  Bus,
  Flag,
  LocateFixed,
  MailCheck,
  MapPin,
  MessageSquare,
  Plane,
  Smartphone,
  TrainFront,
  UserRound,
} from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import photo from '@/assets/howitworks/matching.png';

const PostDetails = () => {
  const icons = [
    {
      id: 1,
      icons: <UserRound />,
    },
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
      <div className='flex flex-col justify-center items-center '>
        <div className='border-[1px] rounded-md p-5 w-[800px] flex flex-col gap-5'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-row gap-5 '>
              <div>
                <Image width={400} height={400} src={photo} alt='' />
              </div>
              <div className='flex flex-col gap-5'>
                <div className='flex flex-row items-center gap-1'>
                  <p className='bg-green-500 p-1 rounded-md text-white font-noto-sans'>
                    Found:
                  </p>
                  <p className='font-noto-sans font-semibold'>23/12/2023</p>
                </div>
                <div>
                  <h1 className='text-3xl font-noto-sans font-semibold'>
                    Iphone 15
                  </h1>
                </div>
                <div className='flex flex-row gap-1 border-b-[1px] pb-2 text-slate-700 font-noto-sans'>
                  <MapPin size={22} />
                  <p>Podujeve</p>
                </div>
                <div className='flex flex-row gap-1'>
                  <LocateFixed className='text-slate-700' size={22} />
                  <div>
                    <p className='text-slate-700 font-noto-sans text-[16px]'>
                      Exact location
                    </p>
                    <p className='text-slate-900 font-noto-sans'>
                      Afer bankes te raifaisen
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className='text-sm text-slate-500'>1 day</p>
            </div>
          </div>
          <div className='flex flex-row flex-wrap gap-5 w-auto lg:w-[500px] border-[1px] rounded-md p-2'>
            <div className='flex flex-row gap-1 flex-wrap'>
              <UserRound className='text-orange-500 ' size={22} />
              <div className='flex flex-col gap-1'>
                <p className=' text-slate-500 font-noto-sans'>Registered</p>
                <p className='font-noto-sans'>Bernard Kastrati</p>
              </div>
            </div>
            <div className='flex flex-row gap-1 flex-wrap'>
              <MapPin className='text-orange-500 ' size={22} />
              <div className='flex flex-col gap-1'>
                <p className=' text-slate-500 font-noto-sans'>City</p>
                <p className='font-noto-sans'>Podujeva</p>
              </div>
            </div>
            <div className='flex flex-row gap-1 flex-wrap'>
              <MapPin className='text-orange-500 ' size={22} />
              <div className='flex flex-col gap-1'>
                <p className=' text-slate-500 font-noto-sans'>City</p>
                <p className='font-noto-sans'>Podujeva</p>
              </div>
            </div>
            <div className='flex flex-row gap-1 flex-wrap'>
              <MapPin className='text-orange-500 ' size={22} />
              <div className='flex flex-col gap-1'>
                <p className=' text-slate-500 font-noto-sans'>City</p>
                <p className='font-noto-sans'>Podujeva</p>
              </div>
            </div>
            <div className='flex flex-row gap-1 flex-wrap'>
              <MapPin className='text-orange-500 ' size={22} />
              <div className='flex flex-col gap-1'>
                <p className=' text-slate-500 font-noto-sans'>City</p>
                <p className='font-noto-sans'>Podujeva</p>
              </div>
            </div>
          </div>
          <div>
            <p>Description</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
