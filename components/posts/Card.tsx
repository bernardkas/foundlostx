import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  capitalizeFirstLetter,
  cn,
  formatDate,
  formatDistanceToNow,
} from '@/lib/utils';
import { LostAndFound } from '@prisma/client';
import emptyPhoto from '@/assets/howitworks/matching.png';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import Empty from '../ui/empty';
import { Switch } from '../ui/switch';

interface CardPorps {
  posts: LostAndFound[];
  showDeleteButton?: boolean;
  loading: boolean;
  onClickDelete?: (val: any) => void;
  showPremiumButton?: boolean;
  isPremium?: any;
  selectedPremium?: number[];
  className?: string;

  handleMakePremium?: (id: number) => void;
}
const Card = ({
  posts,
  showDeleteButton = false,
  loading,
  showPremiumButton,
  onClickDelete,
  isPremium,
  selectedPremium,
  handleMakePremium,
  className,
}: CardPorps) => {
  const router = useRouter();
  const handleClickCard = (id: number) => {
    router.push(`/postdetails/${id}`);
  };

  const skeletonArray = Array.from({ length: 5 }).map((_, index) => (
    <Skeleton
      key={index}
      className='w-[320px] md:w-[700px] h-24 flex justify-center rounded-b-md'
    />
  ));

  return (
    <div className='my:2 lg:my-5 w-full'>
      <div className='flex flex-col gap-7 justify-center items-center w-full'>
        {loading ? (
          skeletonArray
        ) : posts.length > 0 ? (
          posts?.map(item => (
            <div key={item.id} className='flex flex-row flex-wrap gap-2'>
              <div
                className={cn(
                  'border-[1px] p-3 rounded-md flex flex-col md:flex-row justify-between cursor-pointer w-[350px] md:w-[850px]',
                  className
                )}
                onClick={() => handleClickCard(item.id)}>
                <div className='flex flex-col md:flex-row gap-5 items-start md:items-start '>
                  <div className='w-[200px] h-[200px]'>
                    {item.photo.length === 0 ? (
                      <Image
                        src={emptyPhoto}
                        className='w-[200px] h-[200px]'
                        alt=''
                      />
                    ) : (
                      <Image
                        width={250}
                        height={250}
                        src={item.photo[0]}
                        className='w-[200px] h-[200px]'
                        alt=''
                      />
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
                      Fullname:
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
                      {formatDate(item.findingDate)}
                    </label>
                  </div>
                  <div>
                    <p className='font-noto-sans text-slate-500 text-sm'>
                      {formatDistanceToNow(item.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-5'>
                {showDeleteButton && onClickDelete && (
                  <Button
                    onClick={() => onClickDelete(item.id)}
                    className=''
                    variant='destructive'>
                    Delete
                  </Button>
                )}
                {showPremiumButton && selectedPremium && (
                  <div className='flex flex-col'>
                    <p className='m-0 text-orange-500'>Make Premium</p>
                    <Switch
                      className='data-[state=checked]:bg-orange-500'
                      disabled={!isPremium}
                      // @ts-ignore
                      checked={
                        selectedPremium?.includes(item?.id) || item?.isPaid
                      }
                      onCheckedChange={() =>
                        // @ts-ignore
                        handleMakePremium(item?.id)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <Empty classname='w-[330px] md:w-[700px] ' />
        )}
      </div>
    </div>
  );
};

export default Card;
