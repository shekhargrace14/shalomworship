"use client";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "@/app/context/DataContext";
import Image from "next/image";
import Link from "next/link";

const Search = ({ data }) => {
  const { songData } = useContext(DataContext);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (songData) {
      setSearchData(
        songData.filter(
          (item) =>
            item.title.toLowerCase().includes(data?.toLowerCase()) ||
            item.content.toLowerCase().includes(data?.toLowerCase())
        )
      );
    }
  }, [data, songData]);

  if (!data) return null; // Don't render anything if no search query

  return (
    <div className="">
      <section className="w-full flex  gap-2 my-4">
        <div>
          {searchData.length > 0 ? (
            searchData.map((item) => (
              <Link href={`/song/${item.seo.slug}`} key={item.id}>
                <div className="bg-[#1f1f1f] rounded-lg hover:bg-[#121212]">
                  <div className=" lg:container mx-auto  p-4 flex gap-4 text-white ">
                    <div className="bg-gray-300 flex items-center w-4/12 rounded overflow-hidden sm:lg-0 md:mb-0 ">
                      <Image
                        src={item.image}
                        alt={item.title || "Song Image"}
                        width={700}
                        className="bg-gray-300 object-cover h-full"
                        height={100}
                      />
                    </div>
                    <div className="w-6/12 grid">
                      <h3 className="line-clamp-1 md:text-xl text-xl font-semibold">
                        {item.title}
                      </h3>
                      <div className="flex gap-2 items-baseline flex-wrap sm:line-clamp-20">
                        <p className="leading-none">{item.creator}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="rounded min-w-full px-4 py-2 text-white bg-red-500 ">
              <p className="text-white text-center">No results found. </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Search;
