// import { fetchArtistBySlug, useGetArtistById } from "@/app/reactQuery/query";
import Processor from "@/components/Processor";
import { fetchArtistByIdWithSongs } from "@/lib/actions/fetchArtistByIdWithSongs";
import { CONTENT_VISIBILITY } from "@/lib/contentVisibility";
import { fetchArtistBySlug } from "@/lib/query/query";



const CreatorSongs = async ({ params }: any) => {


  const id = params;
  const artistData = await fetchArtistByIdWithSongs(id, [...CONTENT_VISIBILITY.public,]);
  const data = artistData ?? { song: [] };

  // console.log(id, "artist page slug");
  // console.log(data.song, "artist.song  data");
  // console.log(params, "CreatorSongs params");

  // console.log(artistData, "artistData artist page data");
  return (
    // <>hello</>
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
        {data.song.reverse().map((item) => (
          <div key={item.songId}>
            <Processor item={item.songId} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CreatorSongs;
