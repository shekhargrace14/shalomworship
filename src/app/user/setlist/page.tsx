'use client';
import { CreateSetlist } from '@/components/setlist/CreateSetlist';
import SetlistCreate from '@/components/setlist/setlist-create';
import SetlistList from '@/components/setlist/setlist-list';
import { Spinner } from '@/components/ui/spinner';
import { useChannelStore } from '@/store/useChannelStore';
import { useSetlistStore } from '@/store/useSetlistStore';
import { LucideClockFading } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const page = () => {
  const channelAllSetlists = useSetlistStore((state) => state.channelAllSetlists);
  const currentChannel = useChannelStore((state) => state.currentChannel);
  const channelId = currentChannel?.id;

  if (!channelId) {
    return (
      <div className="h-full p-4 bg-card rounded-2xl mt-4">
        <main className="flex flex-col items-center justify-center gap-4 p-4">
          <Spinner />
        </main>
      </div>
    );
  }

  if (channelAllSetlists.length === 0) {
    return (
      <div className="h-full p-4 bg-card rounded-2xl mt-4">
        <main className="flex flex-col items-center justify-center gap-4 p-4">
          <h2 className="text-3xl">No setlist</h2>
          <SetlistCreate channelId={channelId} />
        </main>
      </div>
    );
  }

  return (
    <div className="h-fit p-4 bg-card rounded-2xl mt-4 space-y-4">
      <div className="flex justify-between ">
        <div className="flex flex-col">
          <h2 className="text-3xl">All Setlist</h2>
          <p className="text-muted-foreground text-sm">Manage and organize your upcoming services</p>
        </div>

        <SetlistCreate channelId={channelId} />
      </div>

      <SetlistList data={channelAllSetlists} />
    </div>
  );
};

export default page;
