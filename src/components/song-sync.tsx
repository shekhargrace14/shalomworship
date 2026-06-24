"use client";

import { syncSongs } from "@/lib/sync/song-sync";
import { useEffect } from "react";

export default function SongSync() {
  useEffect(() => {
    // browser only
    syncSongs();
  }, []);

  return null;
}