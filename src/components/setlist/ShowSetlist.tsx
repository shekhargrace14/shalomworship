'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { ArrowDown, ArrowUp, Bookmark, BookMarked, BrushCleaning, CalendarDays, Clock, EllipsisVertical, File, GripVertical, NotebookText, Plus, Search, Trash, Trash2, X } from 'lucide-react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { HeaderSearch } from '../search/HeaderSearch';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useDragReorder } from '@/hooks/useDragReorder';
import { useSetlistsContext } from '@/lib/setlist/SetlistsContext';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

const ShowSetlist = ({ id }: { id: string }) => {
  const router = useRouter();
  const { setlists, clearSetlist, removeSong, reorderSongs, deleteSetlist } = useSetlistsContext();
  const theSetlist = setlists.find((s) => s.id === id);
  const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const backtoSetlists = () => {
    router.replace(`/setlist`, { scroll: false });
  };
  // ALWAYS call the hook

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
            <CalendarDays className="h-4 w-4" />
            {format(new Date(theSetlist.eventAt), 'EEEE, MMMM d, yyyy')}
          </Badge>
        </section>
        <p className="text-sm  capitalize">{theSetlist?.description}</p>
      </section>

      <section className="flex items-center justify-between gap-4">
        <HeaderSearch redirectCheck={false} setlistId={theSetlist?.id} />
        {/* <Dialog open={open} onOpenChange={setOpen}>
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
        </Dialog> */}
      </section>

      <div className="flex gap-4 flex-col mt-4 ">
        {theSetlist.songs.length === 0 && <p className="pt-4 border-t">Add the song</p>}
        {theSetlist?.songs.map((song: any, index) => (
          <div key={song.id} className={`relative w-full p-4  group hover:bg-background rounded-md flex gap-2 justify-between items-center border border-input`}>
            <Link href={`/song/${song.slug}#lyrics`} className="w-8/12">
              <div className="flex gap-2 items-center justify-start">
                <div className="flex gap-2 ">
                  <div className="font-medium">{index + 1}.</div>
                  <div className="font-medium">{song.title}</div>
                </div>
              </div>
            </Link>

            <EllipsisVertical size={16} onClick={() => setOpenId(openId === song.id ? null : song.id)} />
            {openId === song.id && (
              <div className="absolute flex gap-2 right-0 bg-background px-2 pl-3 py-2 rounded-md">
                {/* <div className="hidden transition group-hover:flex items-center gap-1"> */}
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={(e) => {
                    (e.stopPropagation(), reorderSongs(theSetlist.id, song.id, 'up'));
                  }}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={(e) => {
                    (e.stopPropagation(), reorderSongs(theSetlist.id, song.id, 'down'));
                  }}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>

                {/* Remove SONG  */}
                {/* <Tooltip>
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
                </Tooltip> */}

                <Dialog>
                  <DialogTrigger>
                    <Trash2 className=" cursor-pointer text-destructive" size={20} />
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <p className="text-base">
                        This Will <strong className="text-destructive">Remove</strong> the <strong className="text-destructive">{song.title}</strong> Song from setlist Permanently.
                      </p>
                    </DialogHeader>
                    <DialogDescription>
                      <Button
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSong(theSetlist.id, song.id);
                        }}
                      >
                        <Trash2 size={20} /> Remove Song
                      </Button>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>

                {/* CLOSE  */}
                <Button
                  size="icon"
                  variant="default"
                  className="h-8 w-8 text-foreground hover:bg-accent bg-transparent"
                  onClick={(e) => {
                    setOpenId(openId === song.id ? null : song.id);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
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
