"use client";

import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { SongSearchItem } from "./types";

export function useSongSearch() {
  const [fuse, setFuse] = useState<Fuse<SongSearchItem> | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/search/songs.json")
      .then((r) => r.json())
      .then((data: SongSearchItem[]) => {
        setFuse(
          new Fuse(data, {
            keys: ["title", "artist"],
            threshold: 0.3,
          })
        );
        setReady(true);
      });
  }, []);

  function search(query: string, limit = 20): SongSearchItem[] {
    if (!ready || !fuse || query.length < 2) return [];
    return fuse.search(query).slice(0, limit).map((r) => r.item);
  }

  return { search, ready };
}
