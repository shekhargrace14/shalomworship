import type { ApiResponse, Song } from "@/types";

export async function fetchSongs(): Promise<Song[]> {
  const res = await fetch(`${process.env.SITE_URL}/api/song`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch songs");
  }

  const json: ApiResponse<Song[]> = await res.json();
  return json.data;
}
