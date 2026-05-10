import Processor from "@/components/Processor";
import { CONTENT_VISIBILITY } from "@/lib/contentVisibility";
import { getArtist} from "@/lib/static";

const CreatorSongs = async ({ params }: any) => {
  const id = params;
  const artistData = await getArtist(id, [...CONTENT_VISIBILITY.public,]);
  // console.log(artistData,"artistData")
  const data = artistData ?? { song: [] };

  return (
    // <>hello</>
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
        {data.song.reverse().map((item) => (
          <div key={item.songId}>
            <Processor item={item.songId} variant="imageTop" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CreatorSongs;
