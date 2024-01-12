import Image from 'next/image';
import React from 'react';
import test from '@/assets/howitworks/matching.png';
import { foundPosts, lostPosts } from '@/dummyData';
import { FoundLostItems } from '@/lib/interface';
import { useRouter } from 'next/navigation';
import {
  capitalizeFirstLetter,
  formatDate,
  formatDistanceToNow,
} from '@/lib/utils';

interface CardPorps {
  allPosts: FoundLostItems[];
}
const Card = ({ allPosts }: CardPorps) => {
  console.log('all post to CARD', allPosts);
  const router = useRouter();

  const handleClickCard = (id: number) => {
    router.push(`/postdetails/${id}`);
  };

  return (
    <div className='flex flex-col-reverse gap-7 justify-center my:2 lg:my-10 w-full'>
      {allPosts.map(item => (
        <div
          className='border-[1px] p-3 rounded-md flex flex-col md:flex-row justify-between cursor-pointer '
          key={item.id}
          onClick={() => handleClickCard(item.id)}>
          <div className='flex flex-col md:flex-row gap-5 items-start md:items-center '>
            <div>
              {item.photo && (
                <Image width={150} height={150} src={item.photo} alt='' />
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-lg font-noto-sans font-bold border-b-[1px]'>
                {capitalizeFirstLetter(item.title)}
              </h1>
              <p className='font-noto-sans w-auto md:w-[400px]'>
                {item.description}
              </p>
              <p className='font-noto-sans text-sm text-orange-400'>
                Emri dhe Mbiemri:
                <span className='font-semibold ml-1'>
                  {item.name} {item.lastname}
                </span>
              </p>
            </div>
          </div>
          <div className='flex flex-col justify-between items-end'>
            <div>
              <label
                className={`text-sm font-noto-sans ${
                  item.label === 'found' ? 'bg-green-500' : 'bg-red-600'
                }  text-white font-semibold p-1 rounded-md mr-1`}>
                {capitalizeFirstLetter(item.label)}
              </label>
              <label className='font-noto-sans text-sm'>
                {formatDate(item.findingDate)} {item?.findingTime}
              </label>
            </div>
            <div>
              <p className='font-noto-sans text-slate-500 text-sm'>
                {formatDistanceToNow(item.createdAt)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
