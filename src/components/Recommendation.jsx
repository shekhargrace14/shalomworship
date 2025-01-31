import React from 'react'
import Processor from './Processor';
import { fetchArtistBySlug } from '@/app/reactQuery/query';

const Recommendation = async ({params}) => {
    const slug = params.slug;
    const artistData = await fetchArtistBySlug(slug);
    const data = artistData[0];
    // console.log(slug, "artist page slug");
    // console.log(data.song, "artist.song  data");
    // console.log(params, "CreatorSongs params");
    // console.log(artistData, "artistData artist page data");
    return (
      <section className="w-full">
        <>Recommendation</>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0">
          {data.song.map((item) => (
            <div key={item.songId}>
              <Processor item={item.songId} />
            </div>
          ))}
        </div>
      </section>
    );
  };
export default Recommendation;