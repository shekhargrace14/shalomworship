import { useChannelStore } from '@/store/useChannelStore';

export async function hydrateChannels() {
  const { setChannels, setCurrentChannel } = useChannelStore.getState();

  try {
    const res = await fetch('/api/channel/mine', {
      credentials: 'include',
    });

    const data = await res.json();

    if (data.success) {
      setChannels(data.data);
      setCurrentChannel(data.data[0] ?? null);
    } else {
      setChannels([]);
      setCurrentChannel(null);
    }
  } catch {
    setChannels([]);
    setCurrentChannel(null);
  }
}
