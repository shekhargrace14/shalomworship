'use client';

import { useEffect, useState } from 'react';
import { song } from '@prisma/client';

import { getOrFetchSong } from '@/services/song-cache';

export function useCachedSong(songId?: string | null) {
  const [song, setSong] = useState<song>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!songId) return;

    let cancelled = false;

    async function load(id: string) {
      try {
        setLoading(true);

        const song = await getOrFetchSong(id);

        if (!cancelled) {
          setSong(song);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load(songId);

    return () => {
      cancelled = true;
    };
  }, [songId]);

  return {
    song,
    loading,
  };
}
