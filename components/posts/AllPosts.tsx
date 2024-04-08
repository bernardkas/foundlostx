'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Card from './Card';
import Filter from './filter/Filter';
import axios, { all } from 'axios';
import { Skeleton } from '../ui/skeleton';
import { LostAndFound } from '@prisma/client';
import { useSearchInputState } from '@/lib/store';
import Empty from '../ui/empty';
import { formatDate } from '@/lib/utils';

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState<LostAndFound[]>([]);
  const [filterPosts, setFilterPosts] = useState<LostAndFound[]>([]);
  const [loading, setLoading] = useState(true);
  const { desc, country, city, whereDidFind, setInput } = useSearchInputState();
  const [foundOrLost, setFoundOrLost] = useState('all');
  const [allPostFilter, setAllPostFilter] = useState<LostAndFound[]>([]);
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
  const relevantPosts = allPostFilter.filter(
    post => !filterPosts.some(fp => fp.id === post.id)
  );

  useEffect(() => {
    let filterPost = [...allPosts];

    if (desc) {
      filterPost = filterPost.filter(item =>
        item.title.toLowerCase().includes(desc.toLowerCase())
      );
    }
    if (country) {
      filterPost = filterPost.filter(item => item.country === country);
    }
    if (city) {
      filterPost = filterPost.filter(item => item.city === city);
    }
    if (whereDidFind) {
      filterPost = filterPost.filter(
        item => item.whereDidFind === whereDidFind
      );
    }
    if (foundOrLost) {
      if (foundOrLost === 'all') {
        filterPost = filterPost.filter(item => item);
        const allPost = allPosts.filter(item => item);
        setAllPostFilter(allPost);
      } else {
        filterPost = filterPost.filter(item => item.label === foundOrLost);
        const allPost = allPosts.filter(item => item.label === foundOrLost);
        setAllPostFilter(allPost);
        console.log('allPost', allPost);
      }
    }

    setFilterPosts(filterPost);
  }, [allPosts, desc, country, city, whereDidFind, foundOrLost]);

  console.log('all posts', allPosts);
  console.log('filterPosts', filterPosts);

  console.log('input', { desc, country, city, whereDidFind });

  console.log('foundOrLost', foundOrLost);

  return (
    <div className='mx-2 lg:mx-[15%] flex flex-col lg:flex-row gap-2 '>
      <Filter
        desc={desc}
        country={country}
        city={city}
        whereDidFind={whereDidFind}
        foundOrLost={foundOrLost}
        setFoundOrLost={setFoundOrLost}
      />
      {loading ? (
        <Skeleton className='w-[700px] h-[70px] mt-[20px] rounded-full' />
      ) : (
        <div className='flex flex-col'>
          <div className='flex flex-col items-center'>
            {filterPosts.length > 0 ? (
              <Card posts={filterPosts} />
            ) : (
              <Empty classname='w-[330px] md:w-[700px] ' />
            )}
          </div>

          <h2 className='text-xl font-bold'>Revelant</h2>
          <div className='flex flex-col items-center'>
            {relevantPosts.length > 0 ? (
              <>
                <Card posts={relevantPosts} />
              </>
            ) : (
              <Empty classname='w-[330px] md:w-[700px] ' />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPosts;
