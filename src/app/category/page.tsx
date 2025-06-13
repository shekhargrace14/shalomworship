import CategorySection from '@/components/CategorySection';
import Menu from '@/components/layout/Menu';
import { fetchCategory } from '@/lib/query/query';
import React from 'react';

export async function generateStaticParams() {
  const categories = await fetchCategory();
  
  // Ensure that generateStaticParams always returns an array of objects
  return (categories || []).map(category => ({
    id: category.id.toString(),
  }));
}

const page = () => {
  return (
    <div className='h-[90vh] overflow-y-auto custom-scrollbar p-4'>
      <Menu />
      <CategorySection />
    </div>
  );
};

export default page;