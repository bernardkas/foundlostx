'use client';
import AllPosts from '@/components/posts/AllPosts';
import { Skeleton } from '@/components/ui/skeleton';
import { LostAndFound } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Posts = () => {
  const [allPosts, setAllPosts] = useState<LostAndFound[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPostsData = async () => {
    const resonse = await axios
      .get('/api/posts')
      .then(res => {
        const data = res.data.post;
        setAllPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error fetching data', error);
      });

    return resonse;
  };

  useEffect(() => {
    fetchPostsData();
  }, []);

  return (
    <div>
      <AllPosts allPosts={allPosts} loading={loading} />
    </div>
  );
};

export default Posts;
