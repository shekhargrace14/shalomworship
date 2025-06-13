"use client";
import React from "react";
import ArtistCard from "./ArtistCard";
import { useGetArtists } from "@/lib/query/query";
// import { useGetArtists} from "@/app/reactQuery/query";

const ArtistSection: React.FC<any> = ({number}) => {
  const artists = useGetArtists();
  // console.log(artists, "ArtistSection")

  return (
    <>
      <section className="w-full my-2">
        <div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 ">
          {artists.data
            ?.slice(number)
            .reverse()
            .map((item) => (
              <ArtistCard key={item.id} item={item} />
            ))}
        </div>
      </section>
    </>
  );
};

export default ArtistSection;
