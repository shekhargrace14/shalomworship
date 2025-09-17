import CategorySection from '@/components/CategorySection';
import Menu from '@/components/layout/Menu';
import { MetaData } from '@/components/MetaData';
import { fetchCategory } from '@/lib/query/query';
import { MetaDataProps } from '@/types';
import React from 'react';



export function generateMetadata(): MetaDataProps {
  const title = "Categories";
  const slug = "categories";
  const description = "Explore various categories of songs, artists, and more on Shalom Worship.";
  const image = "";
  const keyword = ["Categories", "Shalom Worship"];

  return { title, slug, image, keyword, metaDescription: description };
}

const page = async() => {



  const categories = await fetchCategory();
  return (
    <div className='p-4'>
      <Menu />
      <CategorySection categories={categories} />
    </div>
  );
};

export default page;