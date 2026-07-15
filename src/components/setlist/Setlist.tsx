'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { CalendarDays, ChevronDown, ChevronUp, NotebookText, Pen, Trash } from 'lucide-react';
import Link from 'next/link';
import { useSetlistsContext } from '@/lib/setlist/SetlistsContext';
import { Badge } from '../ui/badge';

const Setlist = ({ setlist }: any) => {
  console.log(setlist);
  const { deleteSetlist } = useSetlistsContext();

  const [expanded, setExpanded] = useState(false);
  return (
    <section className="bg-card/60 rounded-md p-2 items-center">
      <div className="flex justify-between">
        <section>
          <h3 className="text-lg mb-1 capitalize font-semibold">
            <Link href={`/setlist?id=${setlist.id}`}>{setlist.name}</Link>
          </h3>
          <div className="flex gap-2 w-full mb-4 ">
            <Badge>
              {' '}
              <NotebookText /> {setlist.songs.length} song
            </Badge>
            <Badge>
              {' '}
              <CalendarDays /> {new Date(setlist.eventAt).getDate()}
            </Badge>
          </div>
        </section>

        <Button variant="ghost" size="icon" className="" onClick={() => setExpanded((prev) => !prev)}>
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
      {expanded && (
        <div className="flex flex-col">
          {setlist.songs.length === 0 ? (
            <p className="text-xs text-muted-foreground">No songs</p>
          ) : (
            <>
              <ul className="list-decimal ml-6">
                {setlist.songs.map((song: any) => (
                  <li className=" hover-bg-background">
                    <Link key={song.id} href={`/song/${song.slug}#lyrics`}>
                      {song.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="flex justify-end">
            <Button variant="ghost" className="inline" asChild>
              <Link href={`/setlist?id=${setlist.id}`}>
                <Pen />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Setlist;
