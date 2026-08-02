'use client';

import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { SongSearchItem } from './types';
import { getSongsFromDB } from './search';

export function useSongSearch() {
  const [fuse, setFuse] = useState<Fuse<SongSearchItem> | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function loadSongs() {
      let songs: SongSearchItem[] = [];

      const dbSongs = await getSongsFromDB();

      if (dbSongs.length > 0) {
        songs = dbSongs;
      } else {
        songs = await fetch('/search/songs.json').then((r) => r.json());
      }
      setFuse(
        new Fuse(songs, {
          keys: ['title', 'channel'],
          threshold: 0.3,
        }),
      );

      setReady(true);
    }

    loadSongs();
  }, []);

  function search(query: string, limit = 20): SongSearchItem[] {
    //   query,
    //   ready,
    //   hasFuse: !!fuse,
    // });
    if (!ready || !fuse || query.length < 2) return [];
    return fuse
      .search(query)
      .slice(0, limit)
      .map((r) => r.item);
  }

  return { search, ready };
}
