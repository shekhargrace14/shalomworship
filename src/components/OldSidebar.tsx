'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SetlistCreate from './setlist/setlist-create';
import { useChannelStore } from '@/store/useChannelStore';
import SetlistList from './setlist/setlist-list';
import { useSetlistStore } from '@/store/useSetlistStore';
import { SetlistButton } from './setlist/button/setlist-button';
// import Setlist from './setlist/Setlist';
// import Setlist from './setlist/button/setlist';

const OldSidebar = () => {
  const setlists = useSetlistStore((state) => state.channelAllSetlists);
  const currentChannel = useChannelStore((state) => state.currentChannel);
  const channelId = currentChannel?.id;
  // if (!channelId) {
  //   return;
  // }
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="div flex justify-between">
        <Link href={`/user/setlist`}>
          <p className="text-xl mb-4 font-semibold">
            Setlists<span className="text-base text-muted-foreground">(beta)</span>{' '}
          </p>
        </Link>
        <SetlistButton />
      </div>

      <SetlistList data={setlists} orientation="vertical" />

      {/* <div className="flex flex-col gap-2 mt-4">
        {[...setlists].reverse().map((setlist, index) => (
          <Setlist key={index} setlist={setlist} />

        ))}
      </div> */}
    </div>
  );
};

export default OldSidebar;
