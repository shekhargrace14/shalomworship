'use client';
import React from 'react';
import { SetlistButton } from '@/components/setlist/button/setlist-button';
import SetlistList from '@/components/setlist/setlist-list';
import { useSetlistStore } from '@/store/useSetlistStore';

const page = () => {
  const channelAllSetlists = useSetlistStore((state) => state.channelAllSetlists);

  return (
    <div className="h-fit p-4 rounded-2xl space-y-4">
      <div className="flex justify-between ">
        <div className="flex flex-col">
          <h2 className="h2">All Setlist</h2>
          <p className="text-muted-foreground text-sm">Manage and organize your Setlists</p>
        </div>

        <SetlistButton />
      </div>

      <SetlistList data={channelAllSetlists} />
    </div>
  );
};

export default page;
