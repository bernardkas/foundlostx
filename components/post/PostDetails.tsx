'use client';
import {
  Bus,
  Flag,
  LocateFixed,
  MailCheck,
  MapPin,
  Plane,
  Smartphone,
  TrainFront,
  UserRound,
  MessageCircle,
  Map,
  Phone,
  Radar,
} from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import photo from '@/assets/howitworks/matching.png';
import { usePathname, useRouter } from 'next/navigation';
import {
  formatDate,
  capitalizeFirstLetter,
  formatDistanceToNow,
} from '@/lib/utils';
import { Button } from '../ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { LostAndFound } from '@prisma/client';
import WhereDidLostItRender from './WhereDidLostItRender';

interface PostDetailsProps {
  post: LostAndFound;
}

const PostDetails = ({ post }: PostDetailsProps) => {
  const route = useRouter();

  const otherInformation = [
    {
      id: 1,
      label: 'Full Name',
      data: (
        <span>
          {post?.name} {post?.lastname}
        </span>
      ),
      icon: <UserRound className='text-orange-500 ' size={22} />,
    },
    {
      id: 2,
      label: 'Country',
      data: <span>{post?.country}</span>,
      icon: <UserRound className='text-orange-500 ' size={22} />,
    },
    {
      id: 3,
      label: 'Phone',
      data: post?.phone,
      icon: <MapPin className='text-orange-500 ' size={22} />,
    },
    {
      id: 4,
      label: 'Email',
      data: post?.email,
      icon: <MailCheck className='text-orange-500 ' size={22} />,
    },
    {
      id: 5,
      label: 'Where was it found?',
      data: capitalizeFirstLetter(post?.whereDidFind),
      icon: <Radar className='text-orange-500 ' size={22} />,
    },
  ];
  const handleBack = () => {
    route.back();
  };
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const airoportData = post?.airoport as
    | { airlineName: string; airoportName: string; flightNumber: string }
    | undefined;
  const busData = post?.bus as
    | { busName: string; busRouteNumber: string }
    | undefined;
  const trainData = post?.train as
    | { trainName: string; trainNumber: string }
    | undefined;
  const ferryData = post?.ferry as
    | { ferryName: string; ferryRoute: string }
    | undefined;
  const taxiData = post?.taxi as
    | { taxiName: string; taxiPlate: string }
    | undefined;
  const generalData = post?.generalLocation as
    | { generaleLocation: string }
    | undefined;

  return (
    <div suppressHydrationWarning className='mx-2 my-5 lg:mx-[15%]'>
      <div className=''>
        <Button
          onClick={handleBack}
          className='bg-orange-500 font-noto-sans text-md mb-2'>
          Back
        </Button>
      </div>
      <div className='flex flex-col justify-center items-center '>
        <div className='border-[1px] rounded-md p-5 w-auto lg:w-[850px] flex flex-col gap-5'>
          <div className='flex flex-wrap md:flex-nowrap lg:flex-nowrap flex-row-reverse md:flex-row justify-center'>
            <div className='flex flex-row flex-wrap gap-5 sm:flex sm:align-center justify-center'>
              <div className='mr-10 w-[300px] h-[400px] '>
                {post?.photo.length === 0 ? (
                  <Image width={400} height={400} src={photo} alt='' />
                ) : (
                  <div className=''>
                    <Carousel
                      plugins={[plugin.current]}
                      onMouseEnter={plugin.current.stop}
                      onMouseLeave={plugin.current.reset}>
                      <CarouselContent>
                        {post?.photo.map((photo, index) => (
                          <CarouselItem key={index}>
                            <div className='p-1'>
                              <div>
                                <div className='flex aspect-square items-center justify-center p-6 w-[300px] h-[300px]'>
                                  <Image
                                    src={photo}
                                    width={350}
                                    height={350}
                                    alt=''
                                    className='object-contain'
                                  />
                                </div>
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className='hidden lg:block'>
                        <CarouselPrevious />
                        <CarouselNext />
                      </div>
                    </Carousel>
                  </div>
                )}
              </div>
              <div className='flex flex-col gap-5 w-[370px]'>
                <div className='flex flex-row flex-wrap items-center justify-between gap-1'>
                  <div className='flex flex-row flex-wrap items-center gap-1'>
                    <div
                      className={`${
                        post?.label === 'found' ? 'bg-green-500' : 'bg-red-500'
                      } p-1 rounded-md text-white font-noto-sans`}>
                      {capitalizeFirstLetter(post?.label)}
                    </div>
                    <div className='font-noto-sans font-semibold'>
                      {formatDate(post?.findingDate)} {post?.findingTime}
                    </div>
                  </div>
                  <div>
                    <div className='text-sm text-slate-500'>
                      {formatDistanceToNow(post?.createdAt)}
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className='text-3xl font-noto-sans font-semibold'>
                    {capitalizeFirstLetter(post?.title)}
                  </h1>
                </div>
                <div className='flex flex-row gap-1 border-b-[1px] pb-2 text-slate-700 font-noto-sans'>
                  <MapPin size={22} />
                  <div>
                    <span className='text-gray-500'>City: </span>{' '}
                    {capitalizeFirstLetter(post?.city)}
                  </div>
                </div>
                <div className='flex flex-row gap-1 border-b-[1px] pb-2'>
                  {/* <LocateFixed
                    className='text-slate-700'
                    size={22}
                    width={60}
                    height={20}
                  /> */}
                  <div>
                    <p className='text-gray-500 font-noto-sans text-[16px]'>
                      Exact location:
                    </p>
                    <p className='text-slate-900 font-noto-sans'>
                      {post?.exactLocation}
                    </p>
                  </div>
                </div>
                {/* <div className='flex flex-row gap-1 border-b-[1px] pb-2'>
                  <Map size={22} />
                  <div>
                    <p>Map</p>
                    <Link
                      className='font-noto-sans'
                      href='https://what3words.com/hecklers.president.coining'
                      target='_blank'>
                      click here to show the map
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <h2 className='font-bold border-b-[2px] pb-2 text-lg'>Information</h2>
          <div className='flex flex-row flex-wrap gap-5 w-auto border-[1px] rounded-md p-2'>
            {otherInformation.map(item => (
              <div key={item.id} className='flex flex-row gap-1 flex-wrap'>
                {item.icon}
                <div className='flex flex-col gap-1'>
                  <p className='text-slate-500 font-noto-sans'>{item.label}</p>
                  <p className='font-noto-sans'>{item.data}</p>
                </div>
              </div>
            ))}
          </div>

          <WhereDidLostItRender
            airoportData={airoportData}
            busData={busData}
            trainData={trainData}
            ferryData={ferryData}
            taxiData={taxiData}
            generalData={generalData}
          />
          <div className='flex flex-row  gap-2 w-auto lg:w-[500px]'>
            <MessageCircle
              size={22}
              width={60}
              height={20}
              className=' text-orange-500 '
            />
            <div>
              <div className=' text-slate-500 font-noto-sans'>Description</div>
              <div className=' text-slate-800 font-noto-sans'>
                {post?.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
