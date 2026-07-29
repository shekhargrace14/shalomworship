'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { API_URL } from '@/lib/config';
import { useChannelStore } from '@/store/useChannelStore';

export default function HydratorChannel({ children }: { children: React.ReactNode }) {
  const setChannels = useChannelStore((state) => state.setChannels);
  const channels = useChannelStore((state) => state.channels);
  const setCurrentChannel = useChannelStore((state) => state.setCurrentChannel);
  const currentChannel = useChannelStore((state) => state.currentChannel);

  useEffect(() => {
    async function loadChannels() {
      try {
        const res = await fetch(`${API_URL}/api/channel/mine`, {
          credentials: 'include',
        });

        const data = await res.json();

        if (data.success) {
          setChannels(data.data);
          setCurrentChannel(data.data[0]);
        } else {
          setChannels([]);
        }
      } catch {
        setChannels([]);
      }
    }

    loadChannels();
  }, [setChannels]);

  return <>{children}</>;
}
