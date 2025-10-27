"use client";
import React from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import slugify from "slugify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"

const Album: React.FC<any> = ({ item }) => {
  // console.log(item, "card item")
  const artists = item.artist || [];
  console.log(artists, "album artists");

  const slug = slugify(`${item.slug}`, { lower: true });

  return (

    <>
      <Link href={`/album/${slug}-${item.id}`}>
        {/* <div className=" hover:bg-[#1f1f1f] p-2 rounded-lg"> */}
        <div className="rounded-lg">
          <div className="rounded-lg overflow-hidden h-5/6">
            <Image
              src={item.image}
              alt={item.title || "Song Image"}
              width={700}
              height={500}
            /> 
            {/* <YouTubeThumbnail videoId={item.videoId} alt={item.title}/> */}
          </div>
          <div className="w-full p-2">
            <div className="flex items-center gap-2">
              {/* <Avatar src={creators[0]?.image || "/default-avatar.jpg"} size={34} /> */}
              <Avatar>
                <AvatarImage src={artists[0]?.image || "/default-avatar.jpg"} />
                <AvatarFallback>SW</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="line-clamp-1 text-md text-foreground">{item.title}</h3>
                <p className="text-sm leading-none text-foreground">{artists[0]?.title}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Album;
