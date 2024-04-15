'use client';
import PostDetails from '@/components/post/PostDetails';
import { LostAndFound } from '@prisma/client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface PostProps {
  params: any;
}

const Post = ({ params }: PostProps) => {
  const { id } = params;
  const [post, setPost] = useState<LostAndFound>();

  const fetchPost = async (id: number) => {
    const response = await axios.get(`/api/posts/${id}`).then(res => {
      const data = res.data.response;
      if (data) {
        setPost(data);
      }
    });
    return response;
  };

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  return <div>{post && <PostDetails post={post} />}</div>;
};

export default Post;
