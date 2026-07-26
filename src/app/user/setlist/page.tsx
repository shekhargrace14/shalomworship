'use client';
import { SetlistButton } from '@/components/setlist/button/setlist-button';
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
  return (
    <div className="h-fit p-4 bg-card rounded-2xl mt-4 space-y-4">
      <div className="flex justify-between ">
        <div className="flex flex-col">
          <h2 className="text-3xl">All Setlist</h2>
          <p className="text-muted-foreground text-sm">Manage and organize your upcoming services</p>
        </div>

        <SetlistButton />
      </div>

      <SetlistList data={channelAllSetlists} />
    </div>
  );
};

export default page;
