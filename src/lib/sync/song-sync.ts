
import { getDB } from "../db";

export async function syncSongs() {
  const res = await fetch("/search/songs.json");

  const songs = await res.json();

  const db = await getDB();

  const tx = db.transaction("songs", "readwrite");

  await tx.objectStore("songs").clear();

  for (const song of songs) {
    await tx.objectStore("songs").put(song);
  }

  await tx.done;    

  console.log("Songs synced");
}