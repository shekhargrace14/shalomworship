
import ArtistSection from "@/components/ArtistSection";
import CardSection from "@/components/AlbumSection";
import CategorySection from "@/components/CategorySection";
import Menu from "@/components/layout/Menu";
import SongSection from "@/components/SongSection";
import TrendingSection from "@/components/TrendingSection";
import { fetchAlbums, fetchArtists, fetchCategory} from "@/lib/query/query";
import Link from "next/link";
import AlbumSection from "@/components/AlbumSection";
// import { fetchSongs } from "@/lib/api/songs";
import { CONTENT_VISIBILITY } from "@/lib/contentVisibility";
import { fetchSongs } from "@/lib/actions/fetchSongs";

export default async function Home() {
  const [upcomingSongs, publicSongs, artists, categories, album] = await Promise.all([
    fetchSongs([...CONTENT_VISIBILITY.upcoming,]),
    fetchSongs([...CONTENT_VISIBILITY.public,]),
    fetchArtists(),
    fetchCategory(),
    fetchAlbums()
  ]);
  // console.log(songs)
  return (
    <>
      <div className=" p-4 overflow-y-auto custom-scrollbar ">
        <Menu />
        <h2 className="text-xl font-bold mt-4 mb-2 md:mt-8 hover:underline text-foreground"> <Link href={"/song"}> Upcoming Songs</Link> </h2>
        <SongSection number={"-8"} songs={upcomingSongs} />
        <h2 className="text-xl font-bold mt-4 md:mt-8 hover:underline text-foreground"> <Link href={"/song"}>Trending Songs</Link> </h2>
        <SongSection number={"-8"} songs={publicSongs} />
        {/* <h2 className="text-xl font-extrabold mt-4 md:mt-8 hover:underline text-white"> <Link href={"/song"}>Chords</Link> </h2> */}
        {/* <SongSection number={"-10"} songs={songs} chords="true" /> */}
       
        <h2 className="text-xl font-bold mt-4 md:mt-8 hover:underline text-foreground"><Link href={"/artist"}>Your Favorite Artist</Link></h2>
        <ArtistSection number={"-6"} artists={artists} />

        <h2 className="text-xl font-bold mt-4 md:mt-8 hover:underline text-foreground"> <Link href={"/category"}>Category</Link></h2>
        <CategorySection number={"-10"} categories={categories} />

        <h2 className="text-xl font-bold mt-4 md:mt-8 hover:underline text-foreground"> <Link href={"/song"}>Latest Song</Link></h2>
        <TrendingSection number={"-6"} songs={publicSongs} />

        <h2 className="text-xl font-bold mt-4 md:mt-8 hover:underline text-foreground"> <Link href={"/song"}>Album</Link></h2>
        <AlbumSection number={"-6"} album={album} type="album" />
        <br />

      </div>
    </>
  );
}


export const revalidate = 86400; // once every 24 hours
