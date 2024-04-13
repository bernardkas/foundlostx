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
import { Button } from '../ui/button';

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState<LostAndFound[]>([]);
  const [filterPosts, setFilterPosts] = useState<LostAndFound[]>([]);
  const [loading, setLoading] = useState(true);
  const { desc, country, city, whereDidFind, setInput } = useSearchInputState();
  const [foundOrLost, setFoundOrLost] = useState('all');
  const [allPostFilter, setAllPostFilter] = useState<LostAndFound[]>([]);
  const [visiblePosts, setVisiblePosts] = useState(20); // Number of posts to display initially
  const postsPerPage = 20;
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
  const reversPosts = relevantPosts.reverse();

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

  const handleShowMore = () => {
    setVisiblePosts(prevVisiblePosts => prevVisiblePosts + postsPerPage);
  };

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
      <div className='flex flex-col'>
        <div className='flex flex-col items-center'>
          <Card posts={filterPosts} loading={loading} />
        </div>

        <h2 className='text-xl font-bold'>Revelant</h2>
        <div className='flex flex-col items-center'>
          {reversPosts.slice(0, visiblePosts) && (
            <>
              <Card
                posts={reversPosts.slice(0, visiblePosts)}
                loading={loading}
              />
              {reversPosts.length > visiblePosts && (
                <Button onClick={handleShowMore} className='my-4 bg-orange-500'>
                  Show more
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
