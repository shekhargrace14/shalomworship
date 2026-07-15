'use client';

import React from 'react';
import { Bookmark, CalendarDays } from 'lucide-react';
import { SetlistSong } from '@/lib/setlist/types';
import { useSetlistsContext } from '@/lib/setlist/SetlistsContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import Create from './Create';
import Link from 'next/link';
import { Tooltip, TooltipContent } from '../ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import Image from 'next/image';
import { Badge } from '../ui/badge';

type BookmarkSongProps = {
  song: SetlistSong;
  setlistId?: string; // optional
};

const BookmarkSong = ({ song, setlistId }: BookmarkSongProps) => {
  const { setlists, addSong, removeSong, ready } = useSetlistsContext();

  const isAddedAnywhere = setlists.some((s) => s.songs.some((x) => x.id === song.id));

  // console.log(setlists, " setlists -BookmarkSong")

  // ─────────────────────────────────────────────
  // CONTEXT B: Song page → picker
  // ─────────────────────────────────────────────
  if (!setlistId) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button type="button">
            <Bookmark className={`cursor-pointer transition-colors hover:stroke-accent ${isAddedAnywhere ? 'text-accent' : 'text-muted-foreground'}`} stroke="currentColor" fill={isAddedAnywhere ? 'currentColor' : 'none'} />
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose Setlist</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 ">
            {setlists.map((s) => {
              const isAdded = s.songs.some((x) => x.id === song.id);

              return (
                <div
                  key={s.id}
                  className="bg-muted px-3 py-1 flex items-center justify-between text-sm capitalize"
                  onClick={() => {
                    isAdded ? removeSong(s.id, song.id) : addSong(s.id, song);
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <Link href={`/setlist?id=${s.id}`}>
                      <div className="flex items-end gap-2">
                        <h3 className="text-xl text-extrabold">{s.name}</h3>
                        <p className="text-xs">
                          <Badge variant="outline"> {new Date(s.createdAt).toLocaleDateString()}</Badge>
                        </p>
                      </div>
                      {s.songs.length > 0 && <Image src={s.songs[0].image} alt={s.name} className="w-20 object-cover rounded-md" width={40} height={40} />}
                    </Link>
                  </div>

                  <Tooltip>
                    <TooltipTrigger>
                      <button
                        type="button"
                        className={`p-1 transition-colors ${isAdded ? 'text-accent' : 'text-muted-foreground'} ${!ready ? 'opacity-50' : ''}`}
                        disabled={!ready}
                        onClick={() => {
                          isAdded ? removeSong(s.id, song.id) : addSong(s.id, song);
                        }}
                      >
                        <Bookmark stroke="currentColor" fill={isAdded ? 'currentColor' : 'none'} className={`hover:stroke-accent`} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>{isAdded ? 'Remove Song' : 'Add Song'}</TooltipContent>
                  </Tooltip>
                </div>
              );
            })}

            <section className="w-full flex justify-end mt-4">
              <Create />
            </section>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // ─────────────────────────────────────────────
  // CONTEXT A: Inside setlist → toggle
  // ─────────────────────────────────────────────
  const currentSetlist = setlists.find((s) => s.id === setlistId);
  const isAdded = currentSetlist?.songs.some((x) => x.id === song.id);
  return (
    <>
      {currentSetlist && (
        <button
          type="button"
          disabled={!ready}
          onClick={() => {
            isAdded ? removeSong(setlistId, song.id) : addSong(setlistId, song);
          }}
        >
          <Bookmark className={`cursor-pointer ${isAdded ? 'text-accent' : 'text-muted-foreground'} ${!ready ? 'opacity-50' : ''} `} stroke="currentColor" fill={isAdded ? 'currentColor' : 'none'} />
        </button>
      )}
    </>
  );
};

export default BookmarkSong;
