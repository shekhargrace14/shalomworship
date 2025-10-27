import Menu from "@/components/layout/Menu";
import { fetchArtists, fetchCategory } from "@/lib/query/query";
import React from "react";
import { MetaDataProps } from "@/types";
import CardSection from "@/components/AlbumSection";




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
    <div className="p-4">
      <Menu />
      <CardSection item={artists} />
    </div>
  );
};

export default page;
