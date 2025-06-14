import CategorySection from '@/components/CategorySection';
import Menu from '@/components/layout/Menu';
import { fetchCategory } from '@/lib/query/query';
import React from 'react';


const page = async() => {
  const categories = await fetchCategory();
  return (
    <div className='h-[90vh] overflow-y-auto custom-scrollbar p-4'>
      <Menu />
      <CategorySection categories={categories} />
    </div>
  );
};

export default page;