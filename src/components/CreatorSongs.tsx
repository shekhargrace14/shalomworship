// import { fetchArtistBySlug, useGetArtistById } from "@/app/reactQuery/query";
import Processor from "@/components/Processor";
import { fetchArtistBySlug } from "@/lib/query/query";



const CreatorSongs = async ({ params }:any) => {


  const slug = params.slug;
  const artistData = await fetchArtistBySlug(slug);
  const data = artistData?.[0] ?? { song: [] };

  // console.log(slug, "artist page slug");
  // console.log(data.song, "artist.song  data");
    // console.log(params, "CreatorSongs params");
    
  // console.log(artistData, "artistData artist page data");
  return (
    // <>hello</>
    <section className="w-full">
              <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0 ">
                {data.song.map((item) => (
                  <div key={item.songId}>
                    <Processor item={item.songId} />
                  </div>
                ))}
              </div>
            </section>
  );
};

export default CreatorSongs;
