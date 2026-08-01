'use client';
import { SongSearchItem } from '@/lib/search/types';
import { song } from '@prisma/client';
import { Clock, Dot } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import LinesVersion2 from '../shared/LinesVersion2';
import LinesVersion3 from '../shared/LinesVersion3';
import LinesVersion4 from '../shared/LinesVersion4';
import { Badge } from '../ui/badge';
import SubmissionForm from '../SubmissionForm';
import { FormItem } from '@/types/setlist';
import { toast } from 'sonner';

const SetlistSongCard = ({ item, type }: { item: FormItem; type?: string }) => {
  console.log(item.key, 'SetlistSongCard');
  const id = item?.songId;
  const [song, setSong] = useState<song | null>(null);

  const setlistKey = item?.key.replace(/m$/, '');
  console.log(setlistKey, 'setlistKey SetlistSongCard');

  useEffect(() => {
    async function loadSong() {
      try {
        const res = await fetch(`/api/song/${id}`);

        if (!res.ok) {
          toast.error('Failed to fetch song');
          throw new Error('Failed to fetch song');
        }

        const data = await res.json();
        setSong(data.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadSong();
  }, [id]);
  return (
    <>
      {type === 'metadata' ? (
        <div className="ml-2 flex flex-nowrap gap-4 w-full items-center justify-between">
          <Link href={`/song/${song?.slug}-${song?.id}`}>
            <h3 className="text-md md:text-2xl text-foreground hover:underline ">{song?.title}</h3>
          </Link>

          <div className="flex gap-1 pb-0.5 items-center">
            {song?.key && (
              <Badge variant="secondary" className="text-muted-foreground h-4.5 flex min-w-10 items-center gap-1 px-2 py-1">
                <p className="text-xs"> {item.key}</p>
              </Badge>
            )}
            <Badge variant="secondary" className="text-muted-foreground h-4.5 flex min-w-10 items-center gap-1 px-2 py-1">
              <p className="text-xs">{item.bpm}</p>
            </Badge>
            <Badge variant="secondary" className="text-muted-foreground h-4.5 flex min-w-10 items-center gap-1 px-2 py-1">
              <p className="text-xs"> {item.timeSignature}</p>
            </Badge>
            <p className="mb-2">.</p>
            <Badge variant="secondary" className="bg-transparent text-muted-foreground h-4.5 flex min-w-14 items-center justify-start gap-1 px-2 py-1">
              <Clock className="h-2 w-2 text-accent" />
              <p className="text-xs text-primary"> {item.duration}</p>
            </Badge>
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
