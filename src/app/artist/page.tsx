import Menu from "@/components/layout/Menu";
import { fetchArtists, fetchCategory } from "@/lib/query/query";
import React from "react";
import { MetaDataProps } from "@/types";
import CardSection from "@/components/AlbumSection";
import ArtistSection from "@/components/ArtistSection";




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

  // console.log(artists, "fetched artists");

  return (
    <div className="p-4">
      <Menu />
      <ArtistSection artists={artists} />
    </div>
  );
};

export default page;
