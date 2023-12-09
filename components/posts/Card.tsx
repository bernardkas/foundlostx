import Image from 'next/image';
import React from 'react';
import test from '@/assets/howitworks/matching.png';
import { foundPosts, lostPosts } from '@/dummyData';

interface CardPorps {}
const Card = ({}: CardPorps) => {
  const allPosts = foundPosts.concat(lostPosts);

  console.log('allPosts', allPosts);

  return (
    <div className='flex flex-col gap-7 justify-center my-10 w-full'>
      {allPosts.map(item => (
        <div
          className='border-[1px] p-3 rounded-md flex flex-col md:flex-row justify-between cursor-pointer'
          key={item.id}>
          <div
            key={item.id}
            className='flex flex-col md:flex-row gap-5 items-start md:items-center '>
            <div>
              <Image width={150} height={150} src={item.photo} alt='' />
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-lg font-noto-sans font-bold border-b-[1px]'>
                {item.title}
              </h1>
              <p className='font-noto-sans w-auto md:w-[400px]'>
                {item.description}
              </p>
              <p className='font-noto-sans text-sm'>
                Registered: {item.registered}
              </p>
            </div>
          </div>
          <div className='flex flex-col justify-between items-end'>
            <div>
              <label
                className={`text-sm font-noto-sans ${
                  item.foundLable === 'Found' ? 'bg-green-500' : 'bg-red-600'
                }  text-white font-semibold p-1 rounded-md mr-1`}>
                {item.foundLable}
              </label>
              <label>{item.date}</label>
            </div>
            <div>
              <p className='font-noto-sans text-slate-500 text-sm'>1 day ago</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
