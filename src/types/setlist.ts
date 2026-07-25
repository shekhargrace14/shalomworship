import { Prisma } from '@prisma/client';

import type { SongSearchItem } from '@/lib/search/types';

export type Visibility = 'PRIVATE' | 'PUBLIC' | 'UNLISTED';
export type ItemType = 'SONG' | 'NOTE' | 'SCRIPTURE';

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

export type FormItem = {
  id: string;
  type: ItemType;
  songId: string;
  song: SongSearchItem | null; // UI only
  notes: string;
  order: number;
};

export type Metadata = {
  id: string;
  title: string;
  theme: string;
  description: string;
  scripture: string;
  eventAt: Date | undefined;
  visibility: Visibility;
  notes: string;
  updatedAt: Date;
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

type EditableItemField = Pick<FormItem, 'type' | 'songId' | 'song' | 'notes'>;

export type UpdateItemField = (sectionId: string, itemId: string, key: keyof EditableItemField, value: EditableItemField[keyof EditableItemField]) => void;

export type RemoveItem = (sectionId: string, itemId: string) => void;

//  -----------------------------------------------

// type FullSetlist = Omit<setlist, 'sections'> & {
//   sections: SetlistSection[];
// };

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

export type SetlistSection = {
  title: string;

  order: number;

  notes: string | null;

  items: SetlistItem[];
};

export type SetlistItem = {
  type: ItemType;

  order: number;

  songId: string | null;

  notes: string | null;
};

export type FullSetlistItem = SetlistItem & {
  song?: SongSearchItem;
};

export type FullSetlistSection = Omit<SetlistSection, 'items'> & {
  items: FullSetlistItem[];
};
export type FullSetlistWithSongs = Omit<FullSetlist, 'sections'> & {
  sections: FullSetlistSection[];
};
