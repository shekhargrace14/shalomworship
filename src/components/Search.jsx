"use client";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "@/app/context/DataContext";
import Image from "next/image";
import Link from "next/link";
import { useGetSongs } from "@/app/reactQuery/query";

const Search = ({ searchInput }) => {
  // const songData = useGetSongs()
  const { data: songData, isLoading, isError } = useGetSongs();
  
  console.log(songData,'songData.result');
  // const { songData } = useContext(DataContext);
  

  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (searchInput?.trim()) {
      setSearchData(
        songData?.result.filter(
          (item) =>
            item.title.toLowerCase().includes(searchInput?.toLowerCase()) ||
            item.content.toLowerCase().includes(searchInput?.toLowerCase())
        )
      );
    }
  }, [searchInput, songData]);
 
  

  if (!searchInput) return null; // Don't render anything if no search query

  return (
  
      <section className=" mt-4 h-[90vh] overflow-y-auto custom-scrollbar bg-[#121212]">
      {/* <section className="mt-4 max-h-full overflow-hidden p-2 bg-[#375b83]"> */}
          {searchData.length > 0 ? (
            searchData.map((item) => (
              <Link href={`/song/${item.seo.slug}`} key={item._id}>
                <div className="bg-[#121212] rounded-lg hover:bg-[#3b3b3b] gap-2">
                  <div className=" lg:container mx-auto  p-2 flex gap-4 text-white ">
                    <div className="bg-gray-300 flex items-center w-4/12 rounded overflow-hidden sm:lg-0 md:mb-0 ">
                      <Image
                        src={item.image}
                        alt={item.title || "Song Image"}
                        width={700}
                        className="bg-gray-800 object-cover h-full"
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
      </section>
  );
};

export default Search;
