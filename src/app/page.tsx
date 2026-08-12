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
  getAllLanguages,
} from '@/lib/static';
import { AutoPopup } from '@/components/dialogs/AutoPopup';
import EventSection from '@/components/event/EventSection';
import ChannelSection from '@/components/channel/channel-section';
import SongSection from '@/components/song/song-section';
import CategorySection from '@/components/category/category-section';
import UserWelcome from '@/components/user/user-welcome';
import Hero from '@/components/layout/hero';
import LanguageCard from '@/components/language/language-card';
import LanguageSection from '@/components/language/language-section';

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
    language,
    // album,
    // event
  ] = await Promise.all([
    getAllSongs([...CONTENT_VISIBILITY.upcoming]),
    getAllSongs([...CONTENT_VISIBILITY.public]),
    getAllChannels(),
    getAllCategoriesBasic(),
    getAllLanguages(),
    // getAllAlbums(),
    // getAllEvents(),
  ]);

  return (
    <>
      <Hero />
      <div className="p-4 max-w-7xl m-auto flex gap-20 flex-col">
        <AutoPopup />
        {/* <UserWelcome /> */}

        {/* language */}
        <div className="">
          <div className="w-full flex justify-between items-end ">
            <Link href={'/language'}>
              <h2 className="h2">Language</h2>
            </Link>
            <p className="text-sm text-muted-foreground">
              <Link href={'/language'}>Show All</Link>
            </p>
          </div>
          {/* <CategorySection number={'-6'} categories={categories} /> */}
          <LanguageSection number={6} languages={language} />
        </div>

        {/* Songs */}
        <div className="">
          <div className="w-full flex justify-between items-end ">
            <Link href={'/song'}>
              <h2 className="h2"> Trending Songs </h2>
            </Link>
            <p className="text-sm text-muted-foreground">
              <Link href={'/song'}>Show All</Link>
            </p>
          </div>
          <SongSection number={-4} songs={publicSongs} />
        </div>

        {/* Artist */}
        <div className="">
          <div className="w-full flex justify-between items-end ">
            <Link href={'/channel'}>
              <h2 className="h2">Your Favorite Artist</h2>
            </Link>
            <p className="text-sm text-muted-foreground">
              <Link href={'/channel'}>Show All</Link>
            </p>
          </div>
          <ChannelSection number={-6} channels={channels} />
        </div>

        {/* Categories */}
        <div className="">
          <div className="w-full flex justify-between items-end ">
            <Link href={'/category'}>
              <h2 className="h2">Categories</h2>
            </Link>
            <p className="text-sm text-muted-foreground">
              <Link href={'/category'}>Show All</Link>
            </p>
          </div>
          <CategorySection number={'-6'} categories={categories} />
        </div>
        <br />
      </div>
    </>
  );
}
