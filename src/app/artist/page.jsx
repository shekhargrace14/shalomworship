import ArtistSection from "@/components/ArtistSection";
import Menu from "@/components/Menu";
import React from "react";
import { fetchArtists } from "../reactQuery/query";

export async function generateStaticParams() {
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
