export type SetlistSong = {
  id: string;
  slug: string;
  title: string;
  image: string;
  channel: string;
  status: 'PUBLISH' | 'ARCHIVE' | 'UPCOMING' | 'DRAFT' | 'CANCELLED' | 'COMPLETE' | 'TRASH' | 'REVIEW';
  language: string;
};

export type Setlist = {
  id: string;
  name: string;
  description: string;
  eventAt: Date;
  songs: SetlistSong[];
  createdAt: number;
  updatedAt: number;
};
