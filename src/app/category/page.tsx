import CategorySection from '@/components/CategorySection';
import Menu from '@/components/layout/Menu';
import { MetaData } from '@/components/MetaData';
import { fetchCategory } from '@/lib/query/query';
import React from 'react';


export async function generateStaticParams() {
  const categories = await fetchCategory(); // Fetch all categories from your data source
  return categories?.map((category) => ({
    id: category.id.toString(), // Convert to string if necessary
  }));
}

export async function generateMetadata() {
  const title = "Categories";
  const slug = "categories";
  const description = "Explore various categories of songs, artists, and more on Shalom Worship.";
  const image = "";
  const keyword = ["Categories", "Shalom Worship"];

    return await MetaData({ title, slug, image, keyword, description });

}

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