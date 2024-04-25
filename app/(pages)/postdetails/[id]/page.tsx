'use client';
import Loading from '@/app/loading';
import PostDetails from '@/components/post/PostDetails';
import Review from '@/components/review/Review';
import { LostAndFound } from '@prisma/client';
import axios from 'axios';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface PostProps {
  params: any;
}

const Post = ({ params }: PostProps) => {
  const { id } = params;
  const [post, setPost] = useState<LostAndFound>();
  const [loading, setLoading] = useState(true);

  const fetchPost = async (id: number) => {
    const response = await axios.get(`/api/posts/${id}`).then(res => {
      const data = res.data.response;
      if (data) {
        setPost(data);
        setLoading(false);
      }
    });
    return response;
  };

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className='flex justify-center h-96 items-center'>
          <Loader className='text-orange-500' size={50} />
        </div>
      ) : (
        post && <PostDetails post={post} />
      )}
      <Review lostfoundId={id} />
    </div>
  );
};

export default Post;
