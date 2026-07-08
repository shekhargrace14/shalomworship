import Menu from '@/components/layout/Menu';
import { MetaData } from '@/components/MetaData';
import SongSection from '@/components/song/song-section';
import { CONTENT_VISIBILITY } from '@/lib/contentVisibility';
import { getAllSongs } from '@/lib/static';
import React from 'react';

export function generateMetadata() {
  const title = 'Songs';
  const slug = 'songs';
  const description = 'Explore various songs, artists, and more on Shalom Worship.';
  const image = '';
  const keyword = ['Songs', 'Shalom Worship'];

  return MetaData({
    title,
    slug,
    image,
    keyword,
    metaDescription: description,
  });
}

const page = async () => {
  const songs = await getAllSongs([...CONTENT_VISIBILITY.public]);

  // console.log(songs)
  return (
    <div className="p-4">
      <Menu />
      <SongSection songs={songs} />
    </div>
  );
};

export default page;
