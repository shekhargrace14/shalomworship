"use server"

import ArtistSection from "@/components/ArtistSection";
import CategorySection from "@/components/CategorySection";
import Menu from "@/components/layout/Menu";
import SongSection from "@/components/SongSection";
import TrendingSection from "@/components/TrendingSection";
import { fetchArtists, fetchCategory, fetchSongs, useGetSongs } from "@/lib/query/query";
import Link from "next/link";

export default async function Home() {
  const [songs, artists, categories] = await Promise.all([
    fetchSongs(),
    fetchArtists(),
    fetchCategory()
  ]);
  return(
    <>
    
            <div className=" p-4  h-[90vh] overflow-y-auto custom-scrollbar ">
                <Menu/>
                <h2 className="text-xl font-extrabold mt-4 md:mt-8 hover:underline text-white"> <Link href={"/song"}>Trending Songs</Link> </h2>
                <TrendingSection number={"-8"} songs={songs}/>
                <h2 className="text-xl font-extrabold mt-4 md:mt-8 hover:underline text-white"><Link href={"/artist"}>Your Favorite Artist</Link></h2>
                <ArtistSection number={"-6"} artists={artists} />
                <h2 className="text-xl font-extrabold mt-4 md:mt-8 hover:underline text-white"> <Link href={"/category"}>Category</Link></h2>
                <CategorySection number={"-8"} categories={categories} />
                <h2 className="text-xl font-extrabold mt-4 md:mt-8 hover:underline text-white"> <Link href={"/song"}>Latest Song</Link></h2>
                <SongSection number={"-10"} songs={songs} />
                <br/>

            </div>
        </>
  );
}
