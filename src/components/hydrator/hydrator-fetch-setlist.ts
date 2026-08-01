import { useChannelStore } from '@/store/useChannelStore';
import { useSetlistStore } from '@/store/useSetlistStore';

export async function fetchSetlist(setlistId: string) {
  const { setCurrentSetlist } = useSetlistStore.getState();

  try {
    const res = await fetch(`/api/setlist/${setlistId}`, {
      credentials: 'include',
    });
    const data = await res.json();
    if (data.success) {
      setCurrentSetlist(data.data ?? null);
    } else {
      setCurrentSetlist(null);
    }
  } catch {
    setCurrentSetlist(null);
  }
}
