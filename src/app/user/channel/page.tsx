'use client';
import React from 'react';
import ChannelList from '@/components/user/channel/channel-list';
import { useChannelStore } from '@/store/useChannelStore';

const page = () => {
  const userAllChannels = useChannelStore((state) => state.channels);

  return (
    <div className="h-fit p-4 bg-card rounded-2xl mt-4 space-y-4">
      <div className="flex justify-between ">
        <div className="flex flex-col">
          <h2 className="text-3xl">All Channels</h2>
          <p className="text-muted-foreground text-sm">Manage and organize your Channels</p>
        </div>
      </div>
      <ChannelList data={userAllChannels} />
    </div>
  );
};

export default page;
