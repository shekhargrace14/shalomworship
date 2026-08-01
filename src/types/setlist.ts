import type { SongSearchItem } from '@/lib/search/types';

export type Visibility = 'PRIVATE' | 'PUBLIC' | 'UNLISTED';
export type ItemType = 'SONG' | 'NOTE' | 'SCRIPTURE';

export type FullSetlist = {
  id: string;
  title: string;
  theme: string | null;
  description: string | null;
  scripture: string | null;
  eventAt: string | null;
  visibility: Visibility;
  channelId: string;
  sections: SetlistSection[];
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Setlist = {
  id: string;
  // Metadata
  title: string;
  theme: string | null;
  description: string | null;
  scripture: string | null;
  eventAt: Date | null;
  visibility: Visibility;
  channelId: string;
  notes: string | null;

  // Content
  sections: FormSection[];

  createdAt: Date;
  updatedAt: Date;
};

export type FormSection = {
  id: string;
  title: string;
  notes: string;
  order: number;
  items: FormItem[];
};

export type SetlistSection = {
  title: string;
  order: number;
  notes: string | null;
  items: SetlistItem[];
};

export type FormItem = Omit<SetlistItem, 'key' | 'reference' | 'scripture' | 'notes'> & {
  id: string;
  song: SongSearchItem | null;

  key: string;
  reference: string;
  scripture: string;
  notes: string;
};

export type SetlistItem = {
  type: ItemType;
  order: number;
  // Song (only for SONG items)
  songId: string | null;
  // Music
  key: string | null;
  bpm: number | null;
  timeSignature: string | null; // e.g. "4/4", "3/4", "6/8"
  duration: number | null; // seconds

  // Scripture
  reference: string | null; // e.g. "Genesis 1:1"
  scripture: string | null; // Full verse or passage
  // General
  notes: string | null;
};

export type Metadata = {
  title: string;
  theme: string;
  description: string;
  scripture: string;
  eventAt: Date | undefined;
  visibility: Visibility;
  notes: string;
};

export type SetlistContent = {
  sections: FormSection[];
};

export type SetlistForm = {
  metadata: Metadata;
  sections: FormSection[];
};

export type UpdateSectionField = (sectionId: string, key: keyof Pick<FormSection, 'title' | 'notes'>, value: string) => void;

export type AddItem = (sectionId: string, type?: ItemType) => void;

export type EditableItemField = Pick<FormItem, 'type' | 'songId' | 'song' | 'key' | 'bpm' | 'timeSignature' | 'duration' | 'reference' | 'scripture' | 'notes'>;
export type UpdateItemField = (sectionId: string, itemId: string, key: keyof EditableItemField, value: EditableItemField[keyof EditableItemField]) => void;

export type RemoveItem = (sectionId: string, itemId: string) => void;

export type FullSetlistItem = SetlistItem & {
  song?: SongSearchItem;
};

export type FullSetlistSection = Omit<SetlistSection, 'items'> & {
  items: FullSetlistItem[];
};
export type FullSetlistWithSongs = Omit<FullSetlist, 'sections'> & {
  sections: FullSetlistSection[];
};
