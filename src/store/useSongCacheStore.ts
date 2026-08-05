import { song } from '@prisma/client';
import { create } from 'zustand';

export interface CachedSong {
  data: song;
  cachedAt: number;
}

interface SongCacheStore {
  songs: Map<string, CachedSong>;

  setSong: (song: song) => void;
  removeSong: (songId: string) => void;
  clearCache: () => void;
}

export const useSongCacheStore = create<SongCacheStore>((set) => ({
  songs: new Map(),

  setSong: (song) =>
    set((state) => {
      const songs = new Map(state.songs);

      songs.set(song.id, {
        data: song,
        cachedAt: Date.now(),
      });

      return { songs };
    }),

  removeSong: (songId) =>
    set((state) => {
      const songs = new Map(state.songs);

      songs.delete(songId);

      return { songs };
    }),

  clearCache: () =>
    set({
      songs: new Map(),
    }),
}));
