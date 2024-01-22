'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Card from './Card';
import Filter from './filter/Filter';
import axios, { all } from 'axios';
import { FoundLostItems } from '@/lib/interface';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState<FoundLostItems[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get('/api/posts')
      .then(res => {
        const data = res.data.user;
        if (data) {
          setAllPosts(data);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log('Error fetching data', error);
      });
  }, []);

  console.log('loading', loading);
  if (loading) {
    <Skeleton className='w-[100px] h-[20px] rounded-full' />;
  }

  console.log('all posts', allPosts);

  return (
    <div className='mx-2 lg:mx-[15%] flex flex-col lg:flex-row gap-2 '>
      <Filter />
      {loading ? (
        <Skeleton className='w-[700px] h-[70px] mt-[20px] rounded-full' />
      ) : (
        <Card allPosts={allPosts} />
      )}
    </div>
  );
};

export default AllPosts;
