"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { useGetArtists } from "@/lib/query/query";
// import { useGetArtistBySlug } from "@/lib/query/query";
// import { ArtistProps } from "@/types";
import Avatar from "../ui/Avatar";

type ArtistProps = {
  artists: {
    id: string;
    name: string;
    type: "individual" | "band" | "label" | "channel" | null;
    link: string | null;
    image: string | null;
    slug: string | null;
    color: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
};


const Artist = ({ artists }: ArtistProps) => {
  // const artistData = useGetArtistById(id);
  // const artistData = useGetArtists();
  const urlSlug = usePathname();
  // console.log(artistData.data, "ArtistData log")  


  return (
    <section className="w-full flex flex-col gap-2">
      {artists && artists.length > 0 ? (
        artists
          ?.slice()
          .reverse()
          .map((item) => (
            <Link key={item.id} href={`/artist/${slugify(item.name, { lower: true })}-${item.id}`}>

              <div
                className={`rounded-lg hover:bg-gradient-to-l from-[#121212] to-[#000000] ${urlSlug.includes(item.id)
                    ? "bg-[#2e2a2a]"
                    : "bg-[rgb(0,0,0)]"
                  }`}
              >
                <div className="lg:container mx-auto p-2 flex gap-4">
                  <div className=" flex items-center md:w-2/12 rounded-full overflow-hidden sm:lg-0 md:mb-0">
                    {/* <Image
                      // src="/user.png"
                      src={item?.image || "/user.png"}
                      alt={item?.name || "Artist Name"}
                      width={60}
                      height={60}
                      className=" object-cover h-full"
                      priority
                    /> */}
                    <Avatar src={item?.image} alt={item?.name} size={55}/>
                  </div>
                  <div className="md:w-10/12 flex flex-col justify-center">
                    <h3 className="line-clamp-1 font-semibold text-base text-white">
                      {item?.name}
                    </h3>
                    <p className=" text-sm text-white">Artist</p>
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
