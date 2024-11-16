"use client";
import { DataContext } from "@/app/context/DataContext";
import React, { useContext, useEffect } from "react";
import Card from "./Card";

const CircleCard = () => {
  const { songData } = useContext(DataContext);
  console.log(songData);
  if (!songData || songData.length === 0) {
    return <p>No Song...</p>;
  }
  return (
    <>
        <section className='w-full my-4'>
          <div className='grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4'>
            {songData.map(item => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </section>
    </>
  );
};

export default CircleCard;
