import PostDetails from '@/components/post/PostDetails';
import axios from 'axios';
import React from 'react';

interface PostProps {
  params: any;
}

const getPost = async (params: number) => {
  const api = axios.create({
    baseURL: 'http://localhost:3000',
  });

  try {
    const res = await api
      .get(`/api/posts/${params}`, {
        headers: {
          'Cache-Control': 'no-store',
        },
      })
      .then(res => res.data.response);

    return res;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch post data');
  }
};

const Post = async ({ params }: PostProps) => {
  const { id } = params;
  console.log('params', params);
  const post = await getPost(id);
  console.log('post', post);
  return (
    <div>
      <PostDetails post={post} />
    </div>
  );
};

export default Post;
