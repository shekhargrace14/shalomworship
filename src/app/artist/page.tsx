import ArtistSection from "@/components/ArtistSection";
import Menu from "@/components/layout/Menu";
import { MetaData } from "@/components/MetaData";
import { fetchArtists, fetchCategory } from "@/lib/query/query";
import React from "react";


export async function generateStaticParams() {
  const categories = await fetchCategory(); // Fetch all categories from your data source
  return categories?.map((category) => ({
    id: category.id.toString(), // Convert to string if necessary
  }));
}


export async function generateMetadata() {
  const title = "Artists";
  const slug = "artists";
  const description = "Explore various artists and their works on Shalom Worship.";
  const image = "";
  const keyword = ["Artists", "Shalom Worship"];

    return await MetaData({ title, slug, image, keyword, description });

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
