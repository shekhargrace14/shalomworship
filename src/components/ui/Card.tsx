"use client";
import React from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import slugify from "slugify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Card: React.FC<any> = ({ item }) => {
  // console.log(item, "card item")

  const artists: { title: string; image?: string }[] = [];
  const creators: { title: string; image?: string }[] = [];
  item.artist.forEach((item: { isCreator: boolean; artist: { title: string; image?: string } }) => {
    if (item.isCreator) {
      creators.push(item.artist);
    } else {
      artists.push(item.artist);
    }
  });
  // console.log(artists, " artists of song page params");
  console.log(creators, " creators of song page params");

  const slug = slugify(`${item.title}`, { lower: true });

  return (

    <>
      <Link href={`/song/${slug}-${item.id}`}>
        {/* <div className=" hover:bg-[#1f1f1f] p-2 rounded-lg"> */}
        <div className="rounded-lg">
          <div className="rounded-lg overflow-hidden h-5/6">
            <Image
              src={item.image}
              alt={item.title || "Song Image"}
              width={700}
              height={500}
            />
          </div>
          <div className="w-full p-2">
            <div className="flex items-center gap-2">
              {/* <Avatar src={creators[0]?.image || "/default-avatar.jpg"} size={34} /> */}
              <Avatar>
                <AvatarImage src={creators[0]?.image || "/default-avatar.jpg"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="line-clamp-1 text-md text-foreground">{item.title}</h3>
                <p className="text-sm leading-none text-foreground">{creators[0]?.title}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
