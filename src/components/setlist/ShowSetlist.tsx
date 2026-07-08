'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Bookmark, BookMarked, BrushCleaning, CalendarDays, Clock, File, GripVertical, NotebookText, Plus, Search, Trash, Trash2, X } from 'lucide-react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { HeaderSearch } from '../search/HeaderSearch';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useDragReorder } from '@/hooks/useDragReorder';
import { useSetlistsContext } from '@/lib/setlist/SetlistsContext';
import { Badge } from '../ui/badge';

const ShowSetlist = ({ id }: { id: string }) => {
  const router = useRouter();
  const { setlists, clearSetlist, removeSong, reorderSongs, deleteSetlist } = useSetlistsContext();
  const theSetlist = setlists.find((s) => s.id === id);
  const [open, setOpen] = useState(false);

  const backtoSetlists = () => {
    router.replace(`/setlist`, { scroll: false });
  };
  // ALWAYS call the hook
  const { onDragStart, onDragEnter, onDragEnd } = useDragReorder(theSetlist?.songs ?? [], (newSongs) => {
    if (!theSetlist) return;
    reorderSongs(theSetlist.id, newSongs);
  });
  if (!theSetlist) {
    return (
      <>
        <p>Setlist not found</p>
        <Button onClick={backtoSetlists}>Back To Setlists</Button>
      </>
    );
  }
  const isEmpty = !theSetlist?.songs || theSetlist.songs.length === 0;
  return (
    <div className="relative flex flex-col bg-input/30 px-3 py-2 my-2 rounded-md">
      <section className="flex flex-col gap-4 mb-4 py-4">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl md:text-5xl text-semibold capitalize">{theSetlist?.name}</h3>
        </div>
        <section className="flex gap-2">
          <Badge>
            {' '}
            <NotebookText /> {theSetlist.songs.length} song
          </Badge>
          <Badge>
            {' '}
            <CalendarDays /> {new Date(theSetlist.createdAt).toLocaleDateString()}
          </Badge>
        </section>
      </section>

      <section className="flex items-center justify-between gap-4">
        <HeaderSearch redirectCheck={false} setlistId={theSetlist?.id} />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              disabled={isEmpty}
              className={` ${isEmpty ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer '}`}
              onClick={(e) => {
                if (isEmpty) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <BrushCleaning />
                  </span>
                </TooltipTrigger>

                <TooltipContent>{isEmpty ? 'No Song to be clean' : 'Clean Setlist'}</TooltipContent>
              </Tooltip>
            </button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <p className="text-left">
                This will <strong className="text-destructive">remove</strong> all songs from <strong className="text-destructive">"{theSetlist.name}"</strong> setlist permanently.
              </p>
            </DialogHeader>

            <DialogDescription>
              <Button
                variant="destructive"
                className="cursor-pointer"
                onClick={() => {
                  if (!theSetlist?.id) return;
                  clearSetlist(theSetlist.id);
                  setOpen(false);
                }}
              >
                <Trash2 size={20} />
                Remove All
              </Button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </section>

      <div className="flex gap-4 flex-col mt-4 ">
        {theSetlist.songs.length === 0 && <p className="pt-4 border-t">Add the song</p>}
        {theSetlist?.songs.map((song: any, index) => (
          <div
            key={song.id}
            className={`w-full pl-1 pr-3 py-1 group hover:bg-background rounded-md flex gap-2 justify-between items-center py-4 border border-input`}
            draggable
            onDragStart={() => onDragStart(index)}
            onDragEnter={() => onDragEnter(index)}
            onDragEnd={onDragEnd}
            onDragOver={(e) => e.preventDefault()}
          >
            <Link href={`/song/${song.slug}`} className="w-8/12">
              <div className="flex gap-2 items-center justify-start">
                <GripVertical fill="currentColor" className="opacity-80 group-hover:opacity-100 text-muted-foreground hover:text-accent cursor-pointer" />
                <div className="flex flex-col ">
                  <div className="font-medium">{song.title}</div>
                  <div className="text-xs opacity-70">
                    {song.artist}
                    {song.status === 'upcoming' && ' • Coming Soon'}
                  </div>
                </div>
              </div>
            </Link>
            {/* <div className="w-2/12 flex gap-2 items-center font-regular text-xs text-muted-foreground"><Clock size={12} /> 4:30</div> */}

            <Tooltip>
              <TooltipTrigger>
                <Trash2
                  className={`text-muted-foreground hover:text-destructive cursor-pointer`}
                  fill="currentColor"
                  size={16}
                  onClick={(e) => {
                    removeSong(theSetlist.id, song.id);
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>Remove Song</TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>

      <Dialog>
        <DialogTrigger>
          <Trash2 className="absolute right-5 top-9 cursor-pointer text-destructive" size={20} />
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <p>
              This Will <strong className="text-destructive">Delete</strong> the <strong className="text-destructive">{theSetlist.name}</strong> Setlist Permanently.
            </p>
          </DialogHeader>
          <DialogDescription>
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (!theSetlist?.id) return;
                deleteSetlist(theSetlist.id);
              }}
            >
              <Trash2 size={20} /> Delete Permanently
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ShowSetlist;
