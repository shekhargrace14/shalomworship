import { getAllSongs } from '@/lib/static/song.static';
import { CONTENT_VISIBILITY } from '@/lib/contentVisibility';
import fs from 'fs';
import path from 'path';

import type { song, channel } from '@prisma/client';

type SongWithChannel = song & {
  channel: {
    title: string;
    slug: string;
  } | null;
};

export async function buildSongSearchIndex() {
  const songs = await getAllSongs([...CONTENT_VISIBILITY.discoverable]);

  const index = songs.map((song: SongWithChannel) => {
    return {
      id: song.id,
      slug: `${song.slug}-${song.id}`,
      title: song.title,
      image: song.image,
      status: song.status,
      language: song.language,
      channel: song?.channel?.title,
      channelSlug: song?.channel?.slug,
      key: song?.key,
    };
  });

  const outputPath = path.join(process.cwd(), 'public/search/songs.json');

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));
}
