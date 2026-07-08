// import CategorySection from "@/components/CategorySection";
import Menu from '@/components/layout/Menu';
// import SongSection from "@/components/SongSection";
import Link from 'next/link';
// import AlbumSection from "@/components/AlbumSection";
import { CONTENT_VISIBILITY } from '@/lib/contentVisibility';
import {
  getAllAlbums,
  getAllChannels,
  getAllCategoriesBasic,
  // getAllEvents,
  getAllSongs,
} from '@/lib/static';
import { AutoPopup } from '@/components/AutoPopup';
import EventSection from '@/components/event/EventSection';
import ChannelSection from '@/components/channel/channel-section';
import SongSection from '@/components/song/song-section';
import CategorySection from '@/components/category/category-section';

type Song = {
  id: string;
  name: string;
  image: string;
};
export default async function Home() {
  const [
    upcomingSongs,
    publicSongs,
    channels,
    categories,
    // album,
    // event
  ] = await Promise.all([
    getAllSongs([...CONTENT_VISIBILITY.upcoming]),
    getAllSongs([...CONTENT_VISIBILITY.public]),
    getAllChannels(),
    getAllCategoriesBasic(),
    // getAllAlbums(),
    // getAllEvents(),
  ]);

  // console.log(event,  "event on page.tsx")
  return (
    <div className="p-4">
      <AutoPopup />
      <Menu />
      {/* 
        <div className="w-full flex justify-between items-end ">
          <h2 className="text-xl font-bold mt-4 mb-2 md:mt-8 hover:underline text-foreground">Upcoming Events</h2>
          {event.length <= 5 ? "" : <p className="text-sm text-muted-foreground"><Link href={"/event"}>Show All</Link></p>}
        </div>
        <EventSection number={"-4"} event={event} variant="imageOnly" /> */}
      {/* <div className="w-full flex justify-between items-end ">
          <h2 className="text-xl font-bold mt-4 mb-2 md:mt-8 hover:underline text-foreground"> Upcoming Songs</h2>
          { upcomingSongs.length<=5 ? "": <p className="text-sm text-muted-foreground"><Link href={"/song"}>Show All</Link></p>}
        </div>
        <SongSection number={"-4"} songs={upcomingSongs} variant="imageOnly" /> */}

      <div className="w-full flex justify-between items-end ">
        <h2 className="text-xl font-bold mt-4 md:mt-8 hover:underline text-foreground"> Trending Songs </h2>
        <p className="text-sm text-muted-foreground">
          <Link href={'/song'}>Show All</Link>
        </p>
      </div>
      <SongSection number={-4} songs={publicSongs} />

      <div className="w-full flex justify-between items-end ">
        <h2 className="text-xl font-bold mt-4 mb-2 md:mt-8 hover:underline text-foreground">Your Favorite Artist</h2>
        <p className="text-sm text-muted-foreground">
          <Link href={'/channel'}>Show All</Link>
        </p>
      </div>
      <ChannelSection number={-6} channels={channels} />

      <div className="w-full flex justify-between items-end ">
        <h2 className="text-xl font-bold mt-4 mb-2 md:mt-8 hover:underline text-foreground">Categories</h2>
        <p className="text-sm text-muted-foreground">
          <Link href={'/category'}>Show All</Link>
        </p>
      </div>
      <CategorySection number={'-6'} categories={categories} />

      {/* <div className="w-full flex justify-between items-end ">
          <h2 className="text-xl font-bold mt-4 mb-2 md:mt-8 hover:underline text-foreground">Album</h2>
          <p className="text-sm text-muted-foreground"><Link href={"/album"}>Show All</Link></p>
        </div>
        <AlbumSection number={"-4"} album={album} type="album" /> */}

      <br />
    </div>
  );
}
