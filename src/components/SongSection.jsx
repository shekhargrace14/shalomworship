"use client";
import React from "react";
import Card from "./Card";
import { useGetSongs } from "@/app/reactQuery/query";
import SongCard from "./SongCard";

const SongSection = ({number}) => {
  const songData = useGetSongs()
  // console.log(songData.data, "CircleCard")
  if (!songData || songData.length === 0) {
    return <p>No Song...</p>;
  }
  return (
    <>
        <section className='w-full my-2'>
          <div className='grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 '>
            {songData.data?.slice(number).reverse().map(item => (
              <SongCard key={item.id} item={item} />
            ))}
          </div>
        </section>
    </>
  );
};

export default SongSection;
