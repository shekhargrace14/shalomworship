import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useGetSongs } from "@/app/reactQuery/query";

const Artist = () => {
  const songData = useGetSongs();
  const urlSlug = usePathname();
  // console.log(songData.data, "artist log")

  return (
    <section className="w-full flex flex-col-reverse gap-2">
      {songData?.data?.length > 0 ? (
        songData.data.map((item) => (
          <Link key={item.id} href={`/song/${item.id}`}>
            <div
              className={`rounded-lg hover:bg-gradient-to-l from-[#121212] to-[#000000] ${
                urlSlug.includes(item.slug) ? "bg-[#2e2a2a]" : "bg-[rgb(0,0,0)]"
              }`}
            >
              <div className="lg:container mx-auto p-2 md:flex gap-4 text-white">
                <div className="bg-gray-300 flex items-center md:w-4/12 rounded overflow-hidden sm:lg-0 md:mb-0 mb-4">
                  <Image
                    src={item.image}
                    alt={item.title || "Song Image"}
                    width={700}
                    height={100}
                    className="bg-gray-300 object-cover h-full"
                    priority
                  />
                </div>
                <div className="md:w-8/12 grid">
                  <h3 className="line-clamp-1 text-base">{item.title}</h3>
                  {/* <div className=" flex flex-wrap gap-2 items-baseline sm:line-clamp-20">
                    {item.artist.map((artistItem, index) => (
                      <p key={index} className="leading-none text-sm">
                        {artistItem.artist.name}
                      </p>
                    ))}
                  </div> */}
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
