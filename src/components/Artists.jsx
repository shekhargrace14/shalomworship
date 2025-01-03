import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useGetSongs } from "@/app/reactQuery/query";

const Artist = () => {
  const { data: songData, isLoading, isError } = useGetSongs();
  const urlSlug = usePathname();

  if (isLoading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  if (isError) {
    return <p className="text-white text-center">Something went wrong. Please try again later.</p>;
  }

  return (
    <section className="w-full flex flex-col-reverse gap-2">
      {songData?.result?.length > 0 ? (
        songData.result.map((item) => (
          <Link key={item.id} href={`/song/${item.slug}`} >
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
                  <div className="flex gap-2 items-baseline flex-wrap sm:line-clamp-20">
                    <p className="leading-none text-sm">{item.creator}</p>
                    <p className="font-bold leading-4 text-white">{item.creator} -</p>

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
