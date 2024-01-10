'use client';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import Filter from './filter/Filter';
import axios, { all } from 'axios';
import { FoundLostItems } from '@/lib/interface';
import { Loader2 } from 'lucide-react';

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState<FoundLostItems[]>([]);
  useEffect(() => {
    axios
      .get('/api/posts')
      .then(res => {
        const data = res.data.user;
        if (data) {
          setAllPosts(data);
        }
      })
      .catch(error => {
        console.log('Error fetching data', error);
      });
  }, []);

  console.log('all posts', allPosts);

  return (
    <div className='mx-2 lg:mx-[15%] flex flex-col lg:flex-row gap-2 '>
      <Filter />
      {allPosts.length > 0 ? (
        <Card allPosts={allPosts} />
      ) : (
        <Loader2 className='' size={40} />
      )}
    </div>
  );
};

export default AllPosts;
