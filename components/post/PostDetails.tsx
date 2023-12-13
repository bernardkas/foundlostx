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
import Image from 'next/image';
import React from 'react';

import photo from '@/assets/howitworks/matching.png';

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
      <div className='flex flex-col justify-center items-center '>
        <div className='border-[1px] rounded-md p-5 w-[800px] flex flex-col gap-5'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-row gap-5'>
              <div>
                <Image width={400} height={400} src={photo} alt='' />
              </div>
              <div className='flex flex-col gap-4'>
                <div>Found: 23/12/2023</div>
                <div>
                  <h1>Iphone 15</h1>
                </div>
                <div className='flex flex-row gap-1'>
                  <MapPin />
                  <p>Podujeve</p>
                </div>
              </div>
            </div>
            <div>1 day</div>
          </div>
          <div>
            <h1>hello</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
