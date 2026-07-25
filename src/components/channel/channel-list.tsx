'use client';

import React from 'react';
import ChannelCard from './channel-card';
import { useChannelStore } from '@/store/useChannelStore';

const ChannelList = () => {
  const channels = useChannelStore((state) => state.channels);
  return (
    <div>
      User Channel List
      <div className="grid grid-cols-4 gap-2">
        {channels.map((channel) => (
          <>
            <ChannelCard key={channel.id} item={channel} />
          </>
        ))}
      </div>
    </div>
  );
};

export default ChannelList;
