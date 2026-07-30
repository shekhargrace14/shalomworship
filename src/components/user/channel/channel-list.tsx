import React from 'react';
import { Setlist } from '@/types/setlist';
import ChannelCard from '@/components/channel/channel-card';
import { channel } from '@prisma/client';
interface Props {
  data: channel[];
}

const ChannelList = ({ data }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {data.map((channel: channel) => (
          <ChannelCard key={channel.id} item={channel} href={`/user/setlist/view?id=${channel.id}`} />
        ))}
      </div>
    </div>
  );
};

export default ChannelList;
