'use client';
import { API_URL } from '@/lib/config';
import { useChannelStore } from '@/store/useChannelStore';
import { useSetlistStore } from '@/store/useSetlistStore';
import { useEffect } from 'react';

export default function HydratorSetlist({ children }: { children: React.ReactNode }) {
  const currentChannel = useChannelStore((state) => state.currentChannel);
  const channelId = currentChannel?.id;

  const setChannelAllSetlists = useSetlistStore((state) => state.setChannelAllSetlists);
  const channelAllSetlists = useSetlistStore((store) => store.channelAllSetlists);
  useEffect(() => {
    if (channelAllSetlists.length > 0) return;

    async function loadDemoSetlist() {
      try {
        const res = await fetch('/api/setlist/6a6f2fde024a8d346c639919');
        const data = await res.json();

        if (data.success) {
          setChannelAllSetlists([data.data]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadDemoSetlist();
  }, [channelAllSetlists.length, setChannelAllSetlists]);

  useEffect(() => {
    async function loadSetlists() {
      if (!channelId) {
        return;
      }
      try {
        const res = await fetch(`/api/channel/${channelId}/setlists`);
        const data = await res.json();

        if (data.success) {
          setChannelAllSetlists(data.data);
        }
      } catch (error: any) {
        setChannelAllSetlists([]);
      }
    }
    loadSetlists();
  }, [currentChannel, setChannelAllSetlists]);
  return <>{children}</>;
}
