import ArtistSection from "@/components/ArtistSection";
import Menu from "@/components/layout/Menu";
import { fetchArtists } from "@/lib/query/query";
import React from "react";


const page = async () => {
  const artists = await fetchArtists();

  return (
    <div className=" h-[90vh] overflow-y-auto custom-scrollbar p-4">
      <Menu />
      <ArtistSection artists={artists} />
    </div>
  );
};

export default page;
