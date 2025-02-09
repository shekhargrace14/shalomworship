"use client";
import React from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const TrendingCard = ({ item }) => {
  // console.log(item, "card item")

  const artists = [];
  const creators = [];
  item.artist.forEach((item) => {
    if (item.isCreator) {
      creators.push(item.artist);
    } else {
      artists.push(item.artist);
    }
  });
  // console.log(artists, " artists of song page params");
  // console.log(creators, " creators of song page params");
  return (
    
    <>
      <Link href={`/song/${item.slug}`}>
        <div className=" bg-[#262b30]  rounded-lg flex justify-between gap-2">
          <div className="rounded-lg overflow-hidden ">
            <Image
              src={item.image}
              alt={item.title || "Song Image"}
              width={150}
              height={100}
            />
          </div>
          <div className="w-full p-2 flex items-center">
              <h3 className="line-clamp-1 text-sm font-bold text-white">{item.title}</h3>
          </div>
        </div>
      </Link>
    </>
  );
};

export default TrendingCard;
