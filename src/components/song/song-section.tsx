
// import { CardVariant, MasterCard } from "./mastercard";
import { channel, song } from "@prisma/client";
import SongCard, { CardVariant } from "./song-card";
// import SongCard from "./song/song-card";

type Props = {
  songs: song[];
  number?: number;
  variant?: CardVariant;
};

type SongWithChannel = song & {
  channel: channel | null;
};

const SongSection = ({
  number,
  songs,
  variant,
}: Props) => {


  return (
    <section className="my-2 w-full">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {songs
          ?.slice(number)
          .toReversed()
          .map((item: any) => (
            <SongCard
              key={item.id}
              id={item.id}
              item={item}
              variant={variant as CardVariant}
              image={item.image ?? undefined}
              title={item.title}
              language={item.language ?? undefined}
              slug={item.slug ?? undefined}
              channel={item?.channel ?? undefined}
            />
          ))}
      </div>
    </section>
  );
};


export default SongSection;