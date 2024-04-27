'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Card from './Card';
import Filter from './filter/Filter';
import axios, { all } from 'axios';
import { LostAndFound } from '@prisma/client';
import { useSearchInputState } from '@/lib/store';
import { Button } from '../ui/button';

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState<LostAndFound[]>([]);
  const [filterPosts, setFilterPosts] = useState<LostAndFound[]>([]);
  const [loading, setLoading] = useState(true);
  const { desc, country, city, whereDidFind, setInput } = useSearchInputState();
  const [foundOrLost, setFoundOrLost] = useState('all');
  const [allPostFilter, setAllPostFilter] = useState<LostAndFound[]>([]);
  const [visiblePosts, setVisiblePosts] = useState(20);
  const [premiumPost, setPremiumPost] = useState<LostAndFound[]>([]);
  const [enterprisePost, setEnterprisePost] = useState<LostAndFound[]>([]);
  const postsPerPage = 20;

  const fetchPostsData = async () => {
    const resonse = await axios
      .get('/api/posts')
      .then(res => {
        const data = res.data.post;
        if (data) {
          setAllPosts(data);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log('Error fetching data', error);
      });

    return resonse;
  };

  useEffect(() => {
    fetchPostsData();
  }, []);
  
  const relevantPosts = allPostFilter.filter(
    post =>
      !filterPosts.some(fp => fp.id === post.id) && !premiumPost.includes(post)
  );
  const reversPosts = relevantPosts.reverse();

  useEffect(() => {
    let filterPost = [...allPosts];

    const premium = allPosts.filter(item => item?.isPaid === true);
    setPremiumPost(premium.reverse());

    const enterprise = allPosts.filter(item => item?.isEnterprise === true);
    setEnterprisePost(enterprise);

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
      }
    }

    setFilterPosts(filterPost);
  }, [allPosts, desc, country, city, whereDidFind, foundOrLost]);

  const handleShowMore = () => {
    setVisiblePosts(prevVisiblePosts => prevVisiblePosts + postsPerPage);
  };

  return (
    <div className='mx-2 lg:mx-[15%] flex flex-col lg:flex-row gap-2'>
      <Filter
        desc={desc}
        country={country}
        city={city}
        whereDidFind={whereDidFind}
        foundOrLost={foundOrLost}
        setFoundOrLost={setFoundOrLost}
      />
      <div className='flex flex-col'>
        <div className='flex flex-col items-center pt-3'>
          <Card
            posts={filterPosts.filter(post => !premiumPost.includes(post))}
            loading={loading}
          />
        </div>

        {enterprisePost.length > 0 && (
          <div className='flex flex-col mt-5 border-b-[2px] p-3 border-indigo-500'>
            <h1 className='font-bold text-lg font-noto-sans text-indigo-500 uppercase'>
              ENTERPRISE
            </h1>
            <Card
              className='border-[1px] border-indigo-500'
              posts={enterprisePost}
              loading={loading}
            />
          </div>
        )}
        {premiumPost.length > 0 && (
          <div className='flex flex-col mt-5 border-b-[2px] p-3 border-orange-500'>
            <h1 className='font-bold text-lg font-noto-sans text-orange-500 uppercase'>
              Premium
            </h1>
            <Card
              className='border-[1px] border-orange-500'
              posts={premiumPost}
              loading={loading}
            />
          </div>
        )}

        {reversPosts.length > 0 && (
          <>
            <h2 className='text-xl font-bold mt-4'>Revelant</h2>
            <div className='flex flex-col items-center my-5'>
              {reversPosts.slice(0, visiblePosts) && (
                <>
                  <Card
                    posts={reversPosts
                      .slice(0, visiblePosts)
                      .filter(post => !premiumPost.includes(post))}
                    loading={loading}
                  />
                  {reversPosts.length > visiblePosts && (
                    <Button
                      onClick={handleShowMore}
                      className='my-4 bg-orange-500'>
                      Show more
                    </Button>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllPosts;
