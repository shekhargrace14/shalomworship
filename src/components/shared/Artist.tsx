"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { useGetArtists } from "@/lib/query/query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
// import { useGetArtistBySlug } from "@/lib/query/query";
// import { ArtistProps } from "@/types";

type ArtistProps = {
  artists: {
    id: string;
    title: string;
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
            <Link key={item.id} href={`/artist/${slugify(item.title, { lower: true })}-${item.id}`}>

              <div
                className={`rounded-lg bg-card ${urlSlug.includes(item.id)
                  ? "bg-[#2e2a2a]"
                  : "bg-[rgb(0,0,0)]"
                  }`}
              >
                <div className="lg:container mx-auto p-2 flex gap-4">
                  <div className=" flex items-center md:w-2/12 rounded-full overflow-hidden sm:lg-0 md:mb-0">
                    <Image
                      src={item?.image || "/user.png"}
                      alt={item?.title || "Artist Name"}
                      width={60}
                      height={60}
                      className=" object-cover h-full"
                      priority
                    />

                  </div>
                  <div className="md:w-10/12 flex flex-col justify-center">
                    <h3 className="line-clamp-1 font-semibold text-base text-card-foreground">
                      {item?.title}
                    </h3>
                    <p className=" text-sm text-card-foreground">Artist</p>
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
