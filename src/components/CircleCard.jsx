"use client";
import React from "react";
import Card from "./Card";
import { useGetSongs } from "@/app/reactQuery/query";

const CircleCard = ({}) => {
  const songData = useGetSongs()
  // console.log(songData.data, "CircleCard")
  if (!songData || songData.length === 0) {
    return <p>No Song...</p>;
  }
  return (
    <>
        <section className='w-full'>
          <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0 '>
            {songData.data?.slice().reverse().map(item => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </section>
    </>
  );
};

export default CircleCard;
