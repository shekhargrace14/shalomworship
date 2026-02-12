
import ArtistSection from "@/components/ArtistSection";
import CardSection from "@/components/AlbumSection";
import CategorySection from "@/components/CategorySection";
import Menu from "@/components/layout/Menu";
import SongSection from "@/components/SongSection";
import TrendingSection from "@/components/TrendingSection";
import { fetchAlbums, fetchArtists, fetchCategory } from "@/lib/query/query";
import Link from "next/link";
import AlbumSection from "@/components/AlbumSection";
// import { fetchSongs } from "@/lib/api/songs";
import { CONTENT_VISIBILITY } from "@/lib/contentVisibility";
import { fetchSongs } from "@/lib/actions/fetchSongs";
import { Mastercard } from "@/components/ui/mastercard";


type Song = {
  id: string;
  name: string;
  image: string;
};
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
        <div className="w-full flex justify-between items-end ">
          <h2 className="text-xl font-bold mt-4 mb-2 md:mt-8 hover:underline text-foreground"> Upcoming Songs</h2>
          { upcomingSongs.length<=5 ? "": <p className="text-sm text-muted-foreground"><Link href={"/song"}>Show All</Link></p>}
        </div>
        <SongSection number={"-4"} songs={upcomingSongs} variant="imageOnly" />
         
        <div className="w-full flex justify-between items-end ">
          <h2 className="text-xl font-bold mt-4 md:mt-8 hover:underline text-foreground"> Trending Songs </h2>
          <p className="text-sm text-muted-foreground"><Link href={"/song"}>Show All</Link></p>
        </div>
        <SongSection number={"-4"} songs={publicSongs} />

        <div className="w-full flex justify-between items-end ">
          <h2 className="text-xl font-bold mt-4 mb-2 md:mt-8 hover:underline text-foreground">Your Favorite Artist</h2>
          <p className="text-sm text-muted-foreground"><Link href={"/artist"}>Show All</Link></p>
        </div>
        <ArtistSection number={"-6"} artists={artists} />

        <div className="w-full flex justify-between items-end ">
          <h2 className="text-xl font-bold mt-4 mb-2 md:mt-8 hover:underline text-foreground">Categories</h2>
          <p className="text-sm text-muted-foreground"><Link href={"/category"}>Show All</Link></p>
        </div>
        <CategorySection number={"-6"} categories={categories} />

        <div className="w-full flex justify-between items-end ">
          <h2 className="text-xl font-bold mt-4 mb-2 md:mt-8 hover:underline text-foreground">Album</h2>
          <p className="text-sm text-muted-foreground"><Link href={"/album"}>Show All</Link></p>
        </div>
        <AlbumSection number={"-4"} album={album} type="album" />

        <br />
      </div>
    </>
  );
}

