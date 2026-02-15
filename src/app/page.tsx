
import ArtistSection from "@/components/ArtistSection";
import CategorySection from "@/components/CategorySection";
import Menu from "@/components/layout/Menu";
import SongSection from "@/components/SongSection";
import Link from "next/link";
import AlbumSection from "@/components/AlbumSection";
import { CONTENT_VISIBILITY } from "@/lib/contentVisibility";
import { getAllAlbums, getAllArtists, getAllCategoriesBasic, getAllSongs } from "@/lib/static";
import { AutoPopup } from "@/components/AutoPopup";


type Song = {
  id: string;
  name: string;
  image: string;
};
export default async function Home() {
  const [upcomingSongs, publicSongs, artists, categories, album] = await Promise.all([
    getAllSongs([...CONTENT_VISIBILITY.upcoming]),
    getAllSongs([...CONTENT_VISIBILITY.public]),
    getAllArtists(),
    getAllCategoriesBasic(),
    getAllAlbums()
  ]);
  return (
    <>
      <div className=" p-4 overflow-y-auto custom-scrollbar ">
        <AutoPopup/>
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

