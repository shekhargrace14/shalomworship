import Menu from "@/components/layout/Menu";
import { MetaData } from "@/components/MetaData";
import SongSection from "@/components/SongSection";
import { fetchSongs } from "@/lib/query/query";
import React from "react";

export async function generateStaticParams() {
  const songs = await fetchSongs(); // Fetch all songs from your data source
  return songs?.map((song) => ({
    id: song.id.toString(), // Convert to string if necessary
  }));
}

export async function generateMetadata() {
  const title = "Songs";
  const slug = "songs";
  const description = "Explore various songs, artists, and more on Shalom Worship.";
  const image = "";
  const keyword = ["Songs", "Shalom Worship"];

    return await MetaData({ title, slug, image, keyword, description });

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
