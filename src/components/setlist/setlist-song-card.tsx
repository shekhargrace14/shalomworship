'use client';
import { song } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import LinesVersion2 from '../shared/LinesVersion2';
import LinesVersion3 from '../shared/LinesVersion3';
import LinesVersion4 from '../shared/LinesVersion4';
import { Badge } from '../ui/badge';
import SubmissionForm from '../SubmissionForm';
import { FormItem } from '@/types/setlist';
import { toast } from 'sonner';
import { useSongCacheStore } from '@/store/useSongCacheStore';
import { useCachedSong } from '@/hooks/useCachedSong';

const SetlistSongCard = ({ item, type }: { item: FormItem; type?: string }) => {
  // const [song, setSong] = useState<song | null>(null);

  const { song, loading } = useCachedSong(item.song?.id);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(song);
  const setlistKey = item.key || '';
  return (
    <>
      {type === 'metadata' ? (
        <div className="w-full ml-2 flex items-center justify-between gap-4">
          <h3 className="line-clamp-1 text-md md:text-2xl text-foreground hover:underline">
            <Link href={`/song/${item.song?.slug}`} className="flex-1 min-w-0">
              {item.song?.title}
            </Link>
          </h3>

          <div className="flex shrink-0 items-center gap-1 pb-0.5">
            {item?.key && (
              <Badge variant="secondary" className="h-4.5 min-w-10">
                {item.key}
              </Badge>
            )}

            {item?.bpm && (
              <Badge variant="secondary" className="h-4.5 min-w-10">
                {item.bpm}
              </Badge>
            )}

            {item?.timeSignature && (
              <Badge variant="secondary" className="h-4.5 min-w-10">
                {item.timeSignature}
              </Badge>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-background" id="lyrics" onClick={(e) => e.stopPropagation()}>
          {song?.version === 'version_2' ? <LinesVersion2 id={song?.id} song={song} isChords={!!song?.isChords} /> : null}
          {song?.version === 'version_3' ? <LinesVersion3 id={song?.id} song={song} isChords={!!song?.isChords} isTranslations={!!song?.isTranslation} language={song?.language} setlistKey={setlistKey} /> : null}
          {song?.version === 'version_4' ? <LinesVersion4 id={song?.id} song={song} isChords={!!song?.isChords} isTranslations={!!song?.isTranslation} language={song?.language} setlistKey={setlistKey} /> : null}
        </div>
      )}
    </>
  );
};

export default SetlistSongCard;
