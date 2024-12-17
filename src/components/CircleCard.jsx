"use client";
import { DataContext } from "@/app/context/DataContext";
import React, { useContext, useEffect } from "react";
import Card from "./Card";

const CircleCard = () => {
  // useEffect(()=>
  // {
    
  // })
  const { songData } = useContext(DataContext);
  // console.log(songData);
  if (!songData || songData.length === 0) {
    return <p>No Song...</p>;
  }
  return (
    <>
        <section className='w-full'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0'>
            {songData.map(item => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </section>
    </>
  );
};

export default CircleCard;
