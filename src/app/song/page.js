import CircleCard from "@/components/CircleCard";
import Menu from "@/components/Menu";
import SongSection from "@/components/SongSection";
import React from "react";
import { fetchSongs } from "../reactQuery/query";

export async function generateStaticParams() {
  const songs = await fetchSongs(); // Fetch all songs from your data source
  return songs.map((song) => ({
    id: song.id.toString(), // Convert to string if necessary
  }));
}

const page = () => {
  return (
    <div className=' h-[90vh] overflow-y-auto custom-scrollbar'>
      <Menu />
      <SongSection />
    </div>
  );
};

export default page;
