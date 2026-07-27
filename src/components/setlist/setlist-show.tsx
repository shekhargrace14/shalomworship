'use client';

import { CalendarDays, Globe, Lock, Music2, NotebookPen } from 'lucide-react';
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
    <Card className="mx-auto w-full max-w-6xl rounded-2xl p-0 overflow-hidden">
      <CardHeader className="bg-background px-8    py-8">
        <CardTitle>
          <h1 className="text-4xl font-bold tracking-tight mb-2">{setlist.title}</h1>
          <p className="text-muted-foreground">{setlist.theme}</p>
        </CardTitle>
        <CardDescription>
          {setlist.description && <p className="mt-2 text-muted-foreground">{setlist.description}</p>} <br />
          <div className="flex flex-wrap gap-2">
            <Badge variant={setlist.visibility === 'PUBLIC' ? 'default' : 'secondary'}>
              {setlist.visibility === 'PUBLIC' ? <Globe className="mr-1 h-4 w-3" /> : <Lock className="mr-1 h-4 w-3" />}

              {setlist.visibility}
            </Badge>

            {setlist.eventAt && (
              <Badge variant="outline">
                <CalendarDays className="mr-1 h-3 w-3" />
                {format(new Date(setlist.eventAt), 'EEEE, MMM d')}
              </Badge>
            )}
          </div>
        </CardDescription>
        <CardAction>
          <Link href={`/user/setlist/edit/?id=${setlist.id}`}>
            <Button>Edit Setlist</Button>
          </Link>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-8">
        {setlist.sections?.map((section: any, sectionIndex: number) => (
          <div key={sectionIndex}>
            <div className="mb-4">
              <h2 className="text-xl font-semibold  tracking-wide">{section.title || 'Songs'}</h2>
              {/* {section.notes && <p className="mt-1 text-sm text-muted-foreground">{section.notes}</p>} */}
            </div>

            <div className="space-y-3">
              {section.items?.map((item: any, itemIndex: number) => (
                <div key={itemIndex} className="rounded-xl border p-4 transition-colors hover:bg-muted/40">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{item.order}</div>
                    <div className="flex-1">
                      {item.songId && (
                        <div className="flex flex-col justify-start  gap-2 ">
                          <div className="w-full flex flex-col gap-2 mb-8" onClick={() => setOpenSongId((prev) => (prev === item.songId ? null : item.songId))}>
                            <div className="w-full flex items-center gap-2">
                              <Music2 className="h-4 w-4" />
                              <SetlistSongCard type="metadata" id={item.songId} />
                            </div>

                            {item.notes && <p className="text-sm text-muted-foreground ">- {item.notes}</p>}
                          </div>
                          {openSongId === item.songId && <SetlistSongCard id={item.songId} />}
                        </div>
                      )}
                      {item.notes && (
                        <div className="flex flex-col">
                          {/* <p>

                                                    {item.notes}
                                                    </p> */}
                          <p className="text-sm text-muted-foreground">{section.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className=" bg-background py-8 ">
        {/* Footer */}

        {setlist.notes && (
          <div className="w-full">
            <h3 className="mb-3 text-lg">Annoucement / Notes</h3>
            <p className="text-sm text-muted-foreground">{setlist.notes}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
