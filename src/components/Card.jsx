"use client";
import React from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Card = ({ item }) => {
  return (
    <>
      <Link href={`/song/${item.slug}`}>
        <div className=" hover:bg-[#1f1f1f] p-2 rounded-lg">
          {/* <iframe width="100%" height="auto" src={item.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
          <div className="rounded-lg overflow-hidden h-5/6">
            {/* <iframe width="100%" height="215" src={item.video} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
            {/* <Image src={item.src} alt={item.title}/> */}
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
              <p
                className=" line-clamp-1 text-sm leading-none text-white"
                dangerouslySetInnerHTML={{ __html: item.creator }}
              />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
