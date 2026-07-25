'use client';
import { SongSearchItem } from '@/lib/search/types';
import { song } from '@prisma/client';
import { Dot } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import LinesVersion2 from '../shared/LinesVersion2';
import LinesVersion3 from '../shared/LinesVersion3';
import LinesVersion4 from '../shared/LinesVersion4';
import { Badge } from '../ui/badge';
import SubmissionForm from '../SubmissionForm';

const SetlistSongCard = ({ id, type }: { id: string; type?: string }) => {
  const [song, setSong] = useState<song | null>(null);

  useEffect(() => {
    async function loadSong() {
      try {
        const res = await fetch(`/api/song/${id}`);

        if (!res.ok) {
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
        <div className="flex flex-nowrap gap-2 items-center w-full">
          <Link href={`/song/${song?.slug}-${song?.id}`}>
            <h3 className="text-2xl text-foreground hover:underline">{song?.title}</h3>
          </Link>
          {song?.key && (
            <Badge variant="outline" className="h-4.5 flex items-center gap-1 border-accent/70 px-2 py-1 bg-primary/10">
              <p className="text-xs"> Key: {song?.key}</p>
            </Badge>
          )}
        </div>
      ) : (
        <div>
          <div className="w-full p-4 pt-4 relative" id="lyrics">
            {song?.version === 'version_2' ? <LinesVersion2 id={song?.id} song={song} isChords={!!song?.isChords} /> : null}
            {song?.version === 'version_3' ? <LinesVersion3 id={song?.id} song={song} isChords={!!song?.isChords} isTranslations={!!song?.isTranslation} language={song?.language} /> : null}
            {song?.version === 'version_4' ? <LinesVersion4 id={song?.id} song={song} isChords={!!song?.isChords} isTranslations={!!song?.isTranslation} language={song?.language} /> : null}
          </div>
        </div>
      )}
    </>
  );
};

export default SetlistSongCard;
