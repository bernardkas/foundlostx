'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Card from './Card';
import Filter from './filter/Filter';
import axios, { all } from 'axios';
import { Skeleton } from '../ui/skeleton';
import { LostAndFound } from '@prisma/client';
import { useSearchInputState } from '@/lib/store';
import Empty from '../ui/empty';

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState<LostAndFound[]>([]);
  const [filterPosts, setFilterPosts] = useState<LostAndFound[]>([]);
  const [loading, setLoading] = useState(true);
  const { desc, country, city, whereDidFind, setInput } = useSearchInputState();
  const [foundOrLost, setFoundOrLost] = useState('all');
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
  const relevantPosts = allPosts.filter(
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
        filterPost = filterPost.filter(item => item.label);
        const allPost = allPosts.filter(item => item);
      } else {
        filterPost = filterPost.filter(item => item.label === foundOrLost);
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
          {filterPosts.length > 0 ? <Card posts={filterPosts} /> : <Empty />}
          <h2 className='text-xl font-bold'>Revelant</h2>
          <Card posts={relevantPosts} />
        </div>
      )}
    </div>
  );
};

export default AllPosts;
