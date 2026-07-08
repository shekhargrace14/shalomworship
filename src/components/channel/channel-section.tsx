import React from 'react';
// import ArtistCard from "./ArtistCard";
import { channel } from '@prisma/client';
import ChannelCard from './channel-card';

type Props = {
  number?: number;
  channels: channel[];
};
const ChannelSection: React.FC<Props> = ({ number, channels }) => {
  return (
    <>
      <section className="w-full my-2">
        <div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 ">
          {channels
            ?.slice(number)
            .reverse()
            .map((item: channel) => (
              <ChannelCard key={item.id} item={item} />
            ))}
        </div>
      </section>
    </>
  );
};

export default ChannelSection;
