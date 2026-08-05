import { song } from '@prisma/client';
import { useSongCacheStore } from '@/store/useSongCacheStore';

/**
 * Returns a song from cache.
 * Fetches it only if missing.
 */
export async function getOrFetchSong(songId: string): Promise<song> {
  const { songs, setSong } = useSongCacheStore.getState();

  const cachedSong = songs.get(songId);

  if (cachedSong) {
    return cachedSong.data;
  }

  const res = await fetch(`/api/song/${songId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch song');
  }

  const json = await res.json();

  setSong(json.data);

  return json.data;
}

/**
 * Prefetch songs into cache.
 */
export async function prefetchSongs(songIds: string[]) {
  const { songs, setSong } = useSongCacheStore.getState();

  await Promise.all(
    songIds.map(async (songId) => {
      if (songs.has(songId)) return;

      try {
        const res = await fetch(`/api/song/${songId}`);

        if (!res.ok) return;

        const json = await res.json();

        setSong(json.data);
      } catch {
        // Ignore prefetch failures
      }
    }),
  );
}

/**
 * Clear cache.
 */
export function clearSongCache() {
  useSongCacheStore.getState().clearCache();
}
