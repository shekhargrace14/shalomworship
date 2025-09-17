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
  // console.log(songs)
  return (
    <>
      <div className=" p-4 overflow-y-auto custom-scrollbar ">
        <Menu />
        <h2 className="text-xl font-bold mt-4 md:mt-8 hover:underline text-foreground"> <Link href={"/song"}>Trending Songs</Link> </h2>
        <SongSection number={"-8"} songs={songs} />
        {/* <h2 className="text-xl font-extrabold mt-4 md:mt-8 hover:underline text-white"> <Link href={"/song"}>Chords</Link> </h2> */}
        {/* <SongSection number={"-10"} songs={songs} chords="true" /> */}
        <h2 className="text-xl font-bold mt-4 md:mt-8 hover:underline text-foreground"> <Link href={"/category"}>Category</Link></h2>
        <CategorySection number={"-10"} categories={categories} />
        <h2 className="text-xl font-bold mt-4 md:mt-8 hover:underline text-foreground"><Link href={"/artist"}>Your Favorite Artist</Link></h2>
        <ArtistSection number={"-6"} artists={artists} />
        <h2 className="text-xl font-bold mt-4 md:mt-8 hover:underline text-foreground"> <Link href={"/song"}>Latest Song</Link></h2>
        <TrendingSection number={"-6"} songs={songs}/>
        <br />

      </div>
    </>
  );
}


export const revalidate = 86400; // once every 24 hours
