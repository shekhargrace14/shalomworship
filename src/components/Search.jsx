"use client";
import { useGetSongs } from "@/fetch/songs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Search = ({ searchInput }) => {
  const songs = useGetSongs();
  const [songlist, setSonglist] = useState([]);

  useEffect(() => {
    if (songs.status == "success") setSonglist(songs.data?.result);
  }, [songs.status]);

  useEffect(() => {
    if (songlist.length > 0 && songs.status == "success") {
      setSonglist(
        songs.data?.result.filter(
          (item) =>
            item.title.toLowerCase().includes(searchInput?.toLowerCase()) ||
            item.content.toLowerCase().includes(searchInput?.toLowerCase())
        )
      );
    }
  }, [searchInput, songs.status]);

  if (!searchInput) return null; // Don't render anything if no search query

  return (
    <section className=" mt-4 h-[90vh] overflow-y-auto custom-scrollbar bg-[#000000]">
      {songlist.length > 0 ? (
        songlist.map((item) => (
          <Link href={`/song/${item.seo.slug}`} key={item.id}>
            <div className="bg-[#1f1f1f] rounded-lg hover:bg-[#121212] gap-2">
              <div className=" lg:container mx-auto  p-2 flex gap-4 text-white ">
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
    </section>
  );
};

export default Search;
