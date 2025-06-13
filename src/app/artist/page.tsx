import ArtistSection from "@/components/ArtistSection";
import Menu from "@/components/layout/Menu";
import { fetchArtists } from "@/lib/query/query";
import React from "react";

export async function generateStaticParams() {
  // const artsits = await fetchArtists(); // Fetch all songs from your data source
  const artsits = await fetchArtists(); // Fetch all songs from your data source
  return artsits.map(artsit => ({
    id: artsit.id.toString(), // Convert to string if necessary
  }));
}

const page = () => {
  return (
    <div className=" h-[90vh] overflow-y-auto custom-scrollbar p-4">
      <Menu />
      <ArtistSection />
    </div>
  );
};

export default page;
