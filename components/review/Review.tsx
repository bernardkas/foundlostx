'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { CircleUser, Loader } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Review as ReviewData, User } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface ReviewProps {
  lostfoundId?: number;
}

const Review = ({ lostfoundId }: ReviewProps) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const [reviewData, setReviewData] = useState<ReviewData[]>();
  const [loadingDataDatabase, setLoadingDataDatabase] = useState(true);

  useEffect(() => {
    axios.get('/api/user/oneuser').then(response => {
      setUser(response.data.data);
    });
  }, []);

  const fetchData = async () => {
    const response = await axios.get('/api/review').then(response => {
      const data = response.data.data;

      const filteredData = data?.filter(
        (item: ReviewData) => item.lostfoundId === Number(lostfoundId)
      );

      setReviewData(filteredData?.reverse());
      setLoadingDataDatabase(false);
    });
    return response;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!user) {
      toast('You need to Sign In to comment', { type: 'info' });
      return;
    }

    if (name === '' || comment === '') {
      toast('Ju duhet ti mbusheni te gjitha fushat', { type: 'info' });
      return;
    }

    if (!lostfoundId) {
      toast('Nuk mundeni te komentoni ne kompanit qe jane bazike', {
        type: 'error',
      });
      return;
    }

    setLoading(true);

    const createReview = await axios.post('/api/review', {
      name,
      comment,
      lostfoundId,
    });

    if (createReview.data.status === 200) {
      toast('You just commented', { type: 'success' });
      setLoading(false);
      setName('');
      setComment('');
      fetchData();
    } else {
      toast(createReview.data.error, { type: 'error' });
      setLoading(false);
    }
  };

  const handleChange = (value: string) => {
    setName(value);
  };

  const handleDelete = async (id: number) => {
    try {
      const deleteComment = await axios.delete(`/api/review/${id}`);
      if (deleteComment.data.status === 200) {
        toast('U fshi me sukses', { type: 'success' });
        fetchData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='my-10 mx-5 md:mx-0'>
      <div className='flex justify-start flex-col items-center'>
        <form onSubmit={handleSubmit} className='w-[300px] md:w-[850px]'>
          <h2 className='font-noto-sans font-bold mb-2'>Comment</h2>
          <div className='flex flex-col gap-3'>
            <Select onValueChange={handleChange}>
              <SelectTrigger className='w-auto border-[1px]'>
                <SelectValue placeholder='Name..' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='anonym'>Anonym</SelectItem>
                  {user?.name && (
                    <SelectItem value={user?.name}>{user?.name}</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Textarea
              onChange={e => setComment(e.target.value)}
              placeholder='Message'
            />
            <Button className='bg-orange-500' type='submit' variant='default'>
              {loading ? <Loader size={20} /> : 'Post'}
            </Button>
          </div>
        </form>

        <div className='w-[300px] md:w-[850px] mt-7'>
          <h3 className='border-b-[1px] pb-1'>
            {reviewData?.length} Responses
          </h3>
          {reviewData?.map(item => (
            <div
              key={item.id}
              className='flex flex-row mt-5 items-center justify-between gap-3 w-full'>
              <div className='flex flex-row items-center gap-3'>
                <p>
                  <CircleUser size={30} className='text-gray-500' />
                </p>
                <div>
                  <p className='font-noto-sans text-black text-[15px]'>
                    {item?.name}
                  </p>
                  <p className='font-noto-sans text-gray-500 text-[15px]'>
                    {item?.comment}
                  </p>
                </div>
              </div>
              {item?.userId === user?.id && (
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant='destructive'>
                  Delete
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
