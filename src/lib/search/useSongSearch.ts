"use client";

import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { SongSearchItem } from "./types";
import { getSongsFromDB } from "./search";

export function useSongSearch() {
  const [fuse, setFuse] = useState<Fuse<SongSearchItem> | null>(null);
  const [ready, setReady] = useState(false);

  // useEffect(() => {
  //   fetch("/search/songs.json")
  //     .then((r) => r.json())
  //     .then((data: SongSearchItem[]) => {
  //       setFuse(
  //         new Fuse(data, {
  //           keys: ["title", "artist"],
  //           threshold: 0.3,
  //         })
  //       );
  //       setReady(true);
  //     });
  // }, []);

  useEffect(() => {
    async function loadSongs() {
      let songs: SongSearchItem[] = [];

      const dbSongs = await getSongsFromDB();
      // console.log("DB Songs", dbSongs.length);

      if (dbSongs.length > 0) {
        songs = dbSongs;
      } else {
        songs = await fetch("/search/songs.json").then((r) => r.json());
      }
      // console.log("Fuse Ready", songs.length);
      setFuse(
        new Fuse(songs, {
          keys: ["title", "channel"],
          threshold: 0.3,
        }),
      );

      setReady(true);
    }

    loadSongs();
  }, []);

  // useEffect(() => {
  //   console.log("Ready changed", ready);
  // }, [ready]);

  // useEffect(() => {
  //   console.log("Fuse changed", !!fuse);
  // }, [fuse]);

  function search(query: string, limit = 20): SongSearchItem[] {
    // console.log({
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
