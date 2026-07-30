import Processor from '@/components/Processor';
import { CONTENT_VISIBILITY } from '@/lib/contentVisibility';
import { getChannel } from '@/lib/static';
import { song } from '@prisma/client';
import SongCard, { CardVariant } from './song/song-card';

const CreatorSongs = async ({ params }: any) => {
  const id = params;
  const ChannelData = await getChannel(id, [...CONTENT_VISIBILITY.public]);
  const data = ChannelData?.songs;

  return (
    // <>hello</>
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
        {data?.reverse().map((item: song) => (
          <div key={item.id}>
            <SongCard
              key={item.id}
              id={item.id}
              item={item}
              variant={'imageTop' as CardVariant}
              image={item.image ?? undefined}
              title={item.title}
              language={item.language ?? undefined}
              slug={item.slug ?? undefined}
              // channel={item?.channel ?? undefined}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CreatorSongs;
