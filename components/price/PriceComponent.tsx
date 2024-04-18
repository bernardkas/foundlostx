'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PriceComponentProps {
  userId: any;
}

const PriceComponent = ({ userId }: PriceComponentProps) => {
  const router = useRouter();
  const handlePremium = () => {
    if (!userId) {
      router.push('/sign-in');
    }
  };
  const handleEnterprise = () => {
    if (!userId) {
      router.push('/sign-in');
    }
  };

  const info = [
    {
      id: 1,
      title: 'Free',
      price: 'Free',
      desc: 'forever free for individuals and small company',
      item: ['Post your lost or found items', '1 post per user'],
    },
    {
      id: 2,
      title: 'Premium',
      price: '£10',
      desc: 'per user/post one time bill',
      item: [
        'All in Free +',
        'From 1 to 30 days',
        'Offers quicker item discovery',
        'Priority Support',
        'In Premium Contests',
        'Distributed on social networks',
      ],
      button: (
        <Button onClick={handlePremium} className='rounded-3xl'>
          Get Premium <ChevronRight size={20} strokeWidth={1.75} />
        </Button>
      ),
    },
    {
      id: 3,
      title: 'Enterprise',
      price: 'Contact Us',
      desc: 'Best for Airoport/Train/Bus Station',
      item: [
        'All in Premium +',
        'Unlimited Posts',
        'Priority Support',
        'In Enterprise contests',
        'Advanced Search',
      ],
      button: (
        <Button onClick={handleEnterprise} className='rounded-3xl'>
          Get Enterprise <ChevronRight size={20} strokeWidth={1.75} />
        </Button>
      ),
    },
  ];
  return (
    <div className=' my-16'>
      <div className='flex flex-row flex-wrap justify-center gap-5'>
        {info.map(item => (
          <div
            key={item.id}
            className={`w-[300px] h-[500px] bg-gradient-to-r from-red-500 to-yellow-600 rounded-md p-12 text-white ${
              item.id === 2
                ? 'border-[3px] border-purple-800 scale-105'
                : 'border-none'
            }`}>
            <div className=''>
              <h3 className='text-[24px] font-bold font-noto-sans'>
                {item.title}
              </h3>
              <h1 className='text-[34px] font-bold font-noto-sans'>
                {item.price}
              </h1>
              <p className='my-3 text-[16px] font-noto-sans'>{item.desc}</p>
              <div className='flex flex-col gap-2 items-start'>
                {item.item.map(item => (
                  <div key={item} className='flex flex-row items-center gap-2'>
                    <Check
                      style={{ width: '22px', height: '22px' }}
                      size={22}
                      strokeWidth={1.75}
                    />
                    <p className=' '>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className='mt-5 text-center'>{item.button}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceComponent;
