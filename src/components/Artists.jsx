import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "@/app/context/DataContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Artist = ({ data }) => {
  const { songData } = useContext(DataContext);
  const urlSlug = usePathname()
  // console.log("urlSlug",urlSlug)
  return (
    <section className="w-full flex flex-col-reverse gap-2">
      {songData.length > 0 ? (
        songData.map((item) => (
          <Link href={`/song/${item.seo.slug}`} key={item.id}>
            {/* <div className={`${item.seo.slug}={"/song/"${urlSlug}{} ? bg-[#c06767] : bg-[rgb(47,209,74)] rounded-lg hover:bg-[rgb(18,18,18)]`}> */}
            <div className="bg-[#1f1f1f] rounded-lg hover:bg-[rgb(18,18,18)]">
              <div className=" lg:container mx-auto  p-2 md:flex gap-4 text-white ">
                <div className="bg-gray-300 flex items-center md:w-4/12 rounded overflow-hidden sm:lg-0 md:mb-0 mb-4 ">
                  <Image
                    src={item.image}
                    alt={item.title || "Song Image"}
                    width={700}
                    className="bg-gray-300 object-cover h-full"
                    height={100}
                  />
                </div>
                <div className="md:w-8/12 grid">
                  <h3 className="line-clamp-1 text-base">
                    {item.title}
                  </h3>
                  <div className="flex gap-2 items-baseline flex-wrap sm:line-clamp-20">
                    <p className="leading-none text-sm">{item.creator}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-white text-center">No results found.</p>
      )}
    </section>
  );
};

export default Artist;
