"use client";
import React from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import slugify from "slugify";

const ArtsitCard = ({ item }:any) => {

  // console.log("item in artist card", item);

  const slug = slugify(`${item.slug}`, {lower: true,}) 

  return (
    
    <>
      <Link href={`/artist/${slug}-${item.id}`}>
        <div className="bg-card rounded-lg ">
          <div className="rounded-lg overflow-hidden h-5/6">
            <Image
              // src="/user.png"
              src={item.image || "/user.png"}
              alt={item.title || "Song Image"}
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="w-full p-2">
            <div className="">
              <h3 className="line-clamp-1 text-1xl mb-1 font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-foreground">Artist</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ArtsitCard;
