'use client';
import React, { useEffect, useState } from 'react';
import Card from '../posts/Card';
import axios from 'axios';
import { LostAndFound, User } from '@prisma/client';
import { toast } from 'react-toastify';

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

  const [user, setUser] = useState<User>();
  const fetchOneUser = async () => {
    const response = await axios
      .get('/api/user/oneuser')
      .then(res => setUser(res.data.data));

    return response;
  };

  useEffect(() => {
    fetchData();
    fetchOneUser();
  }, []);
  const isPremium = user?.subscriptions === 'premium';
  const handleDelete = async (id: any) => {
    const deleteResponse = await axios.delete(`/api/foundlost/edit/${id}`);

    if (deleteResponse.data.status === 200) {
      toast('It deleted successfully', { type: 'success' });
      fetchData();
    } else {
      toast('Somthing went wrong, try reload', { type: 'error' });
    }
  };

  const [selectedPremium, setSelectedPremium] = useState<number[]>([]);
  const handleMakePremium = async (id: number) => {
    const index = selectedPremium.indexOf(id);
    let newSelectedPremium: number[];

    if (index === -1) {
      newSelectedPremium = [...selectedPremium, id];
    } else {
      newSelectedPremium = selectedPremium.filter(itemId => itemId !== id);
    }
    setSelectedPremium(newSelectedPremium);

    const update = await axios.post(`/api/foundlost/edit/${id}`, {
      isPaid: newSelectedPremium.includes(id),
    });
    if (update.data.status === 200) {
      if (newSelectedPremium.includes(id) === true) {
        toast('Yea, You just make it this post Premium', { type: 'success' });
      } else {
        toast('You just remove this post from Premium', {
          type: 'success',
        });
      }
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
          showPremiumButton={true}
          isPremium={isPremium}
          selectedPremium={selectedPremium}
          handleMakePremium={handleMakePremium}
        />
      </div>
    </div>
  );
};

export default Dashboard;
