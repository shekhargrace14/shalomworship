export type ArtistProps = {
  id: string;
  name: string;
  image: string | null;
  type:string ;
};


export type ChordLyric = { chord: string; lyrics: string };

export type Song = {
  id: string;
  title: string;
  key: string;
  lines: ChordLyric[][];
  // Add other properties if needed
};

export type MetaDataProps = {
  title: string
  slug: string
  keyword?: string[]
  metaDescription?: string
  image?: string
}