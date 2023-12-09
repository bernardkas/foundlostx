import React from 'react';
import Card from './Card';
import Filter from './Filter';

const AllPosts = () => {
  return (
    <div className='mx-2 lg:mx-[15%] flex flex-row gap-2 '>
      <Filter />
      <Card />
    </div>
  );
};

export default AllPosts;
