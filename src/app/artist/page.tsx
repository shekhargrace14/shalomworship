import ArtistSection from "@/components/ArtistSection";
import Menu from "@/components/layout/Menu";
import { MetaData } from "@/components/MetaData";
import { fetchArtists, fetchCategory } from "@/lib/query/query";
import React from "react";
import { Metadata } from "next";  
import { MetaDataProps } from "@/types";




export function generateMetadata(): MetaDataProps {
  const title = "Artists";
  const slug = "artists";
  const description = "Explore various artists and their works on Shalom Worship.";
  const image = "";
  const keyword = ["Artists", "Shalom Worship"];

  return {
    title,
    slug,
    image,
    keyword,
    metaDescription: description,
  };

}
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
