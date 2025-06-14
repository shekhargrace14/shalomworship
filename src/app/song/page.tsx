import Menu from "@/components/layout/Menu";
import SongSection from "@/components/SongSection";
import { fetchSongs } from "@/lib/query/query";
import React from "react";

export async function generateStaticParams() {
  const songs = await fetchSongs(); // Fetch all songs from your data source
  return songs.map((song) => ({
    id: song.id.toString(), // Convert to string if necessary
  }));
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
