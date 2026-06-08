export type SetlistSong = {
  id: string;
  slug: string;
  title: string;
  image: string;
  artist: string;
  status: "PUBLISH" | "ARCHIVE" | "UPCOMING" | "DRAFT" | "CANCELLED" | "COMPLETE" | "TRASH";
  language: string;
};

export type Setlist = {
  id: string;
  name: string;
  description: string;
  eventAt:number;
  songs: SetlistSong[];
  createdAt: number;
  updatedAt: number;
};