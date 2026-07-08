'use client';

import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Setlist, SetlistSong } from './types';

const KEY = 'setlists';

export function useSetlists() {
  const [setlists, setSetlists] = useState<Setlist[]>([]);
  const [ready, setReady] = useState(false);

  function reorderSongs(setlistId: string, newSongs: SetlistSong[]) {
    const next = setlists.map((s) => {
      if (s.id !== setlistId) return s;

      return {
        ...s,
        songs: newSongs,
        updatedAt: Date.now(),
      };
    });

    setSetlists(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);

      const normalized = parsed.map((s: any) => ({
        ...s,
        songs: Array.isArray(s.songs) ? s.songs : [], // ✅ fix legacy data
      }));

      setSetlists(normalized);
      localStorage.setItem(KEY, JSON.stringify(normalized));
    } catch {
      setSetlists([]);
    }
    setReady(true); // hydration complete check
  }, []);

  function createSetlist(name: string, description: string) {
    const next: Setlist[] = [
      ...setlists,
      {
        id: nanoid(),
        name,
        description,
        songs: [],
        eventAt: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];
    setSetlists(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  function deleteSetlist(id: string) {
    const next = setlists.filter((s) => s.id !== id);
    setSetlists(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  function clearSetlist(setlistId: string) {
    const next = setlists.map((s) => (s.id === setlistId ? { ...s, songs: [], updatedAt: Date.now() } : s));

    setSetlists(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  function addSong(setlistId: string, song: SetlistSong) {
    if (!ready) return; // ⛔ CRITICAL

    const next = setlists.map((s) => {
      if (s.id !== setlistId) return s;

      if (s.songs.some((x) => x.id === song.id)) return s;

      return {
        ...s,
        songs: [...s.songs, song],
        updatedAt: Date.now(),
      };
    });

    setSetlists(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  function removeSong(setlistId: string, songId: string) {
    const next = setlists.map((s) => {
      if (s.id !== setlistId) return s;

      return {
        ...s,
        songs: s.songs.filter((song) => song.id !== songId),
        updatedAt: Date.now(),
      };
    });

    setSetlists(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  return {
    setlists,
    ready,
    createSetlist,
    deleteSetlist,
    addSong,
    removeSong,
    reorderSongs,
    clearSetlist,
  };
}
