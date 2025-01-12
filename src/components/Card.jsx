"use client";
import React from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Card = ({ item }) => {
  // console.log(item.id, "card item")
  return (
    
    <>
      <Link href={`/song/${item.id}`}>
        <div className=" hover:bg-[#1f1f1f] p-2 rounded-lg">
          <div className="rounded-lg overflow-hidden h-5/6">
            <Image
              src={item.image}
              alt={item.title || "Song Image"}
              width={700}
              height={500}
            />
          </div>
          <div className="w-full lg:w-full py-2">
            <div className="">
              <h3 className="line-clamp-1 text-1xl mb-1 text-white">{item.title}</h3>
              <p className=" line-clamp-1 text-sm leading-none text-white">{item.creator?.name}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
