import React from 'react';
import Card from './Card';
import Filter from './filter/Filter';

const AllPosts = () => {
  return (
    <div className='mx-2 lg:mx-[15%] flex flex-col lg:flex-row gap-2 '>
      <Filter />
      <Card />
    </div>
  );
};

export default AllPosts;
