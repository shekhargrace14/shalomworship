export type ArtistType = {
  id: string;
  name: string;
  image: string | null;
};


export type ChordLyric = { chord: string; lyrics: string };

export type Song = {
  id: string;
  title: string;
  key: string;
  lines: ChordLyric[][];
  // Add other properties if needed
};