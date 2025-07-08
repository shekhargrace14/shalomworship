import Menu from "@/components/layout/Menu";
import { MetaData } from "@/components/MetaData";
import SongSection from "@/components/SongSection";
import { fetchSongs } from "@/lib/query/query";
import { MetaDataProps } from "@/types";
import { Metadata } from "next";
import React from "react";


export function generateMetadata(): MetaDataProps {
  const title = "Songs";
  const slug = "songs";
  const description = "Explore various songs, artists, and more on Shalom Worship.";
  const image = "";
  const keyword = ["Songs", "Shalom Worship"];

  return { title, slug, image, keyword, metaDescription: description };
}

const page = async () => {
  const songs = await fetchSongs();
  return (
    <div className=' h-[90vh] overflow-y-auto custom-scrollbar p-4'>
      <Menu />
      <SongSection songs={songs} />
    </div>
  );
};

export default page;
