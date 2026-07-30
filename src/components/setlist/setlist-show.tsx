'use client';

import { CalendarDays, Edit, Globe, Lock, Music2, NotebookPen } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Setlist } from '@/types/setlist';
import SetlistSongCard from './setlist-song-card';
import { useState } from 'react';

interface Props {
  setlist: Setlist;
}

export default function SetlistShow({ setlist }: Props) {
  if (!setlist) return null;

  const [openSongId, setOpenSongId] = useState<string | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'SONG':
        return '🎵';
      case 'SCRIPTURE':
        return '📖';
      case 'PRAYER':
        return '🙏';
      case 'TEXT':
        return '📝';
      default:
        return '•';
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl rounded-2xl p-0 overflow-hidden">
      {/* <div
        className="bg-background  p-4  pt-24 md:p-8 md:pt-28"
        style={{
          backgroundImage: `linear-gradient(to bottom,  oklch(68.699% 0.11763 191.228), transparent)`,
        }}
      >
        <CardTitle>
          <h1 className="text-3xl md:text-4xl  tracking-tight ">{setlist.title}</h1>
          <p className="text-muted-foreground">{setlist.theme}</p>
        </CardTitle>
        <CardDescription>
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-2 ">

              {setlist.eventAt && (
                <Badge variant="outline">
                  <CalendarDays className="mr-1 h-3 w-3" />
                  {format(new Date(setlist.eventAt), 'EEEE, MMM d')}
                </Badge>
              )}
            </div>
            <Link href={`/user/setlist/edit/?id=${setlist.id}`}>
              <Button>Edit Setlist</Button>
            </Link>
          </div>
        </CardDescription>
      </div> */}

      <div
        className="bg-background p-4 py-8 pt-24 md:pt-40"
        style={{
          backgroundImage: `linear-gradient(to bottom,  oklch(68.699% 0.11763 191.228), transparent)`,
        }}
      >
        <div className="flex flex-col md:flex-row justify-between md:items-end  h-40 md:h-fit">
          <div className="">
            <h1 className="text-3xl md:text-4xl tracking-tight font-medium ">{setlist.title}</h1>
            <p className="text-muted-foreground">{setlist.theme}</p>
            <div className="mt-2">
              {setlist.eventAt && (
                <Badge variant="outline" className="px-2 py-1">
                  <CalendarDays className="mr-1 h-3 w-3" />
                  {format(new Date(setlist.eventAt), 'EEEE, MMM d')}
                </Badge>
              )}
            </div>

            {/* <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>

            <Button type="button" onClick={handleSubmit} disabled={!canSave || loading}>
              <Save className="mr-2 h-4 w-4" />
              {loading ? 'Saving...' : 'Save Setlist'}
            </Button>
            */}
          </div>
          <div className="flex justify-end">
            <></>
            <Link href={`/user/setlist/edit/?id=${setlist.id}`}>
              <Button>
                {/* <Edit className="mr-2 h-4 w-4" /> */}
                Edit Setlist
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative p-4 space-y-8 bg-background">
        <div className="max-w-xl border-l pl-4 py-1 flex flex-col rounded-md">
          {setlist.description && (
            <>
              <p className="text-sm  text-muted-foreground italic">"{setlist.description}"</p>
              <p className="text-sm text-muted-foreground italic text-end mt-2">-{setlist.scripture}</p>
            </>
          )}
        </div>

        {setlist.sections?.map((section: any, sectionIndex: number) => (
          <div key={sectionIndex} className="space-y-4">
            <div className=" p-4 bg-card border-l-4 border-primary rounded-xl">
              <h2 className="text-xl tracking-wide">{section.title || 'Songs'}</h2>
              {section.notes && <p className="mt-1 text-sm text-muted-foreground">{section.notes}</p>}
            </div>
            <div className="space-y-3 ">
              {section.items?.map((item: any, itemIndex: number) => (
                <div key={itemIndex} className="transition-colors group">
                  <div
                    className="pl-2 w-full flex flex-col gap-8"
                    onClick={(e) => {
                      (e.stopPropagation(), setOpenSongId((prev) => (prev === item.songId ? null : item.songId)));
                    }}
                  >
                    <div className="relative w-full flex flex-col gap-2 p-4 rounded-t-xl bg-card border-l border-primary group-hover:bg-muted/40 ">
                      <div className="flex">
                        <span className="absolute -left-3 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary/80 text-sm font-semibold text-primary-foreground">{item.order}</span>
                        {item.type === 'SONG' && <SetlistSongCard type="metadata" id={item.songId} />}
                        {item.type === 'SCRIPTURE' && (
                          <div className="ml-2 flex flex-nowrap gap-4 items-end w-full">
                            <h3 className="text-md md:text-2xl text-foreground hover:underline">{item?.type}</h3>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground ml-2">{item.notes}</p>
                    </div>
                    {item.type === 'SONG' && openSongId === item.songId && <SetlistSongCard id={item.songId} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="p-4 bg-card border-l-4 border-primary rounded-xl">
          {/* Footer */}

          {setlist.notes && (
            <div className="w-full">
              <h3 className="mb-3 text-lg">Annoucement / Notes</h3>
              <p className="text-sm text-muted-foreground">{setlist.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
