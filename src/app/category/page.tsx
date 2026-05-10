import CategorySection from '@/components/CategorySection';
import Menu from '@/components/layout/Menu';
import { MetaData } from '@/components/MetaData';
import { getAllCategoriesBasic } from '@/lib/static';
import React from 'react';



export function generateMetadata() {
  const type = "category"
  const title = "Categories";
  const slug = "categories";
  const description = "Explore various categories of songs, artists, and more on Shalom Worship.";
  const image = "";
  const keyword = ["Categories", "Shalom Worship"];
  return MetaData({type, title, slug, image, keyword, metaDescription: description });
}

const page = async() => {
  const categories = await getAllCategoriesBasic();
  return (
    <div className='p-4'>
      <Menu />
      <CategorySection categories={categories} />
    </div>
  );
};
export default page;