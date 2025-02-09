import CategorySection from '@/components/CategorySection'
import Menu from '@/components/Menu'
import React from 'react'
import { fetchCategory } from '../reactQuery/query';


export async function generateStaticParams() {
  const categories = await fetchCategory(); // Fetch all songs from your data source
  return categories.map(category => ({
    id: category.id.toString(), // Convert to string if necessary
  }));
}

const page = () => {
  return (
    < div className=' h-[90vh] overflow-y-auto custom-scrollbar p-2'>

    <Menu/>
    <CategorySection/>
    </div>
  )
}

export default page