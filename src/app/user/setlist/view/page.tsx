'use client';
import { CreateSetlist } from '@/components/setlist/CreateSetlist';
import SetlistCreate from '@/components/setlist/setlist-create';
import SetlistList from '@/components/setlist/setlist-list';
import SetlistShow from '@/components/setlist/setlist-show';
import { Spinner } from '@/components/ui/spinner';
import { useChannelStore } from '@/store/useChannelStore';
import { useSetlistStore } from '@/store/useSetlistStore';
import { LucideClockFading } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const page = () => {
  const searchParams = useSearchParams();
  const setlistId = searchParams.get('id');

  // console.log(setlistId, 'setlist view page');
  const setCurrentSetlist = useSetlistStore((s) => s.setCurrentSetlist);
  const currentChannel = useChannelStore((s) => s.currentChannel);
  const channelId = currentChannel?.id;

  // console.log(channelId, 'setlist view page');

  useEffect(() => {
    async function loadCurrentSetlist() {
      const res = await fetch(`/api/channel/${channelId}/setlists/${setlistId}`);
      const data = await res.json();
      if (data.success) {
        setCurrentSetlist(data.data);
      }
      // console.log(data, 'data view page');
    }
    loadCurrentSetlist();
  }, [setlistId]);

  const currentSetlist = useSetlistStore((s) => s.currentSetlist);
  // console.log(currentSetlist, 'setlist view page');

  if (!currentSetlist) {
    return <Spinner />;
  }

  return (
    <div className="flex">
      <SetlistShow setlist={currentSetlist} />
    </div>
  );
};

export default page;
