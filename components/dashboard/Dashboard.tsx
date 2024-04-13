'use client';
import React, { useEffect, useState } from 'react';
import Card from '../posts/Card';
import axios from 'axios';
import { LostAndFound } from '@prisma/client';
import { toast } from 'react-toastify';
import Modal from '../ui/modal';
import { Button } from '../ui/button';

const Dashboard = () => {
  const [post, setPost] = useState<LostAndFound[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const response = await axios.get('/api/foundlost/edit').then(res => {
      const data = res.data.data;
      setPost(data);
      setLoading(false);
    });
    return response;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: any) => {
    const deleteResponse = await axios.delete(`/api/foundlost/edit/${id}`);

    if (deleteResponse.data.status === 200) {
      toast('It deleted successfully', { type: 'success' });
      fetchData();
    } else {
      toast('Somthing went wrong, try reload', { type: 'error' });
    }
  };
  return (
    <div className='mx-2 md:mx-32 my-16'>
      <div className='flex justify-center'>
        <Card
          posts={post}
          showDeleteButton={true}
          loading={loading}
          onClickDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Dashboard;
