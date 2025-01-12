import { fetchArtistById, useGetArtistById } from "@/app/reactQuery/query";
import Processor from "@/components/Processor";



const CreatorSongs = async ({ params }) => {


  const id = params.id;
  const artistData = await fetchArtistById(id);
  const data = artistData[0];

    // console.log(params, "CreatorSongs params");

//   console.log(artistData, "artistData artist page data");
//   console.log(data.song, "artist page data");
  // console.log(id, "artist page id");
  return (
    <section className="w-full">
              <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0 ">
                {data.song.map((item) => (
                  <div key={item.songId}>
                    <Processor params={item.songId} />
                  </div>
                ))}
              </div>
            </section>
    // <>
    //   hello CreatorSongs
    //         {data.song.map((item) => (
    //             <div key={item.songId}>
    //             <Processor params={item.songId} />
    //           </div>
    //         ))}
    //         </>
  );
};

export default CreatorSongs;
