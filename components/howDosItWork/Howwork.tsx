import React from 'react';
import Image from 'next/image';
import reporLost from '@/assets/howitworks/itemlost.png';
import browsing from '@/assets/howitworks/browsing.png';

const Howwork = () => {
  const data = [
    {
      key: 1,
      icon: reporLost,
      title: 'Reporting Lost Items',
      desc: '  Users can report lost items by providing details such as a description of the lost item, the location where it was lost, and any other relevant information.',
    },
    {
      key: 2,
      icon: browsing,
      title: 'Browsing Lost Items',
      desc: 'Visitors to the website can browse through a list of lost items to see if anything matches what they have found.',
    },
    {
      key: 3,
      icon: '',
      title: 'Reporting Found Items',
      desc: 'If someone finds a lost item, they can report it on the website',
    },
    {
      key: 4,
      icon: '',
      title: ' Matching Lost and Found Items:',
      desc: 'The system actively searches for matches between reported lost and found items.',
    },
  ];
  return (
    <div className='mt-16  bg-slate-700 bg-opacity-30 p-3'>
      <div className='mx-1 lg:mx-[15%] '>
        <div className='text-center mb-2'>
          <h1 className='text-[24px] font-semibold text-orange-600'>
            How does it work
          </h1>
        </div>
        <div className='flex flex-row justify-around items-center flex-wrap '>
          {data.map(item => (
            <div
              key={item.key}
              className='flex flex-col justify-center items-center p-3'>
              <Image
                className='mb-3 rounded-md'
                width={100}
                height={100}
                src={item.icon}
                alt=''
              />
              <div className='h-[150px] text-center'>
                <h3 className='font-golos-text  font-semibold text-lg mb-2 text-black'>
                  {item.title}
                </h3>
                <p className='w-60 text-center '>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Howwork;
