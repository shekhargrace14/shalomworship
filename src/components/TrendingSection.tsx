"use client";
import React from "react";
// import { useGetSongs } from "@/app/reactQuery/query";
import TrendingCard from "./TrendingCard";
import { useGetSongs } from "@/lib/query/query";


const TrendingSection:React.FC<any> = ({number}) => {
  const songData = useGetSongs()
  console.log(songData.data, "TrendingSection")
  // if (!songData || songData.length === 0) {
  //   return <p>No Song...</p>;
  // }
  return (
    <>
        <section className='w-full my-4'>
          <div className='grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 '>
            {songData.data?.slice(number).map(item => (
              <TrendingCard key={item.id} item={item} />
            ))}
          </div>
        </section>
    </>
  );
};

export default TrendingSection;
