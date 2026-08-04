'use client';

import { CalendarDays, Clock, Edit, Globe, Lock, Minimize, Minimize2, Music2, NotebookPen, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Setlist } from '@/types/setlist';
import SetlistSongCard from './setlist-song-card';
import { useRef, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSetlistStore } from '@/store/useSetlistStore';
import { Spinner } from '../ui/spinner';
import ShowSetlist from './ShowSetlist';
import ButtonShare from '../shared/button-share';
import { SetlistButton } from './button/setlist-button';

interface Props {
  setlist: Setlist | null;
}

export default function SetlistShow({ setlist }: Props) {
  if (!setlist) return null;
  const router = useRouter();
  const [openSongIds, setOpenSongIds] = useState<string[]>([]);
  const channelAllSetlists = useSetlistStore((state) => state.channelAllSetlists);

  const isUserSetlist = channelAllSetlists.some((s) => s.id === setlist.id);

  const songRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);

  return (
    <div className="relative mx-auto w-full max-w-6xl rounded-2xl p-0 overflow-hidden">
      <div
        className="bg-background p-4 py-8 pt-24 md:pt-40 "
        style={{
          backgroundImage: `linear-gradient(to bottom,  oklch(68.699% 0.11763 191.228), transparent)`,
        }}
      >
        <div className="absolute right-4 top-4 ">
          <ButtonShare />
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-end  h-40 md:h-fit">
          <div className="">
            <h1 className="text-3xl md:text-4xl tracking-tight font-medium ">{setlist.title}</h1>
            <p className="text-muted-foreground">{setlist.theme}</p>
            <div className="mt-2 flex gap-2">
              {setlist.eventAt && (
                <Badge variant="outline" className="h-4 flex items-center gap-1 border-accent/70 px-2 py-2   bg-primary/10">
                  <CalendarDays className="h-2 w-2 text-accent" />
                  <span className="text-accent text-[12px]">{format(new Date(setlist.eventAt), 'EEE, MMM d')}</span>
                </Badge>
              )}
              {/* <Badge variant="outline" className="h-4 flex items-center gap-1 border-accent/70 px-2 py-2   bg-primary/10">
                <Clock className="h-2 w-2 text-accent" />
                <span className="text-accent text-[12px]">35:00</span>
              </Badge> */}
            </div>
          </div>
          <div className="flex justify-end">
            {isAuthenticated ? (
              <Button
                variant={isUserSetlist ? 'default' : 'secondary'}
                onClick={() => {
                  if (!isUserSetlist) {
                    toast.info('Editing is currently limited to the logged-in creator of this setlist. Team collaboration will be available soon.');
                    return;
                  }
                  router.push(`/user/setlist/edit?id=${setlist.id}`);
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Setlist
              </Button>
            ) : (
              <SetlistButton />
            )}
          </div>
        </div>
      </div>
      <div className="relative p-4 space-y-8 bg-background">
        {setlist.description && (
          <div className="max-w-xl border-l pl-4 py-2 flex flex-col rounded-md">
            <p className="text-sm  text-muted-foreground italic">"{setlist.description}"</p>
            <p className="text-sm text-muted-foreground italic text-end mt-2">{setlist.scripture}</p>
          </div>
        )}
        {setlist.sections?.length > 0 ? (
          <>
            {setlist.sections?.map((section: any, sectionIndex: number) => (
              // SECTION
              <div key={sectionIndex} className="space-y-4">
                <div
                  className=" p-4 bg-card border-l-4 border-primary rounded-xl"
                  onClick={() => {
                    const songIds = section.items.filter((item: any) => item.type === 'SONG').map((item: any) => item.song.id);

                    setOpenSongIds((prev) => {
                      const allOpen = songIds.every((id: string) => prev.includes(id));

                      if (allOpen) {
                        // Close all songs in this section
                        return prev.filter((id) => !songIds.includes(id));
                      }

                      // Open all songs in this section
                      return [...new Set([...prev, ...songIds])];
                    });
                  }}
                >
                  <h2 className="text-xl tracking-wide">{section.title || 'Songs'}</h2>
                  {section.notes && <p className="mt-1 text-sm text-muted-foreground">{section.notes}</p>}
                </div>

                {/* ITEMS */}
                <div className="space-y-3 ">
                  {section.items?.map((item: any, itemIndex: number) => (
                    <div key={itemIndex} className="transition-colors group space-y-4">
                      <div
                        ref={(el) => {
                          songRefs.current[item.song?.id] = el;
                        }}
                        className="pl-2 md:pl-4 w-full flex flex-col gap-8"
                        onClick={(e) => {
                          e.stopPropagation();

                          setOpenSongIds(
                            (prev) =>
                              prev.includes(item.song.id)
                                ? prev.filter((id) => id !== item.song.id) // close
                                : [...prev, item.song.id], // open
                          );
                        }}
                      >
                        <div className="relative w-full flex flex-col gap-3 p-4 rounded-t-xl bg-card border-l border-primary group-hover:bg-muted/40 ">
                          <div className="flex">
                            <span className="absolute -left-3 top-5.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/80 text-sm font-semibold text-primary-foreground">{item.order}</span>
                            {item.type === 'SONG' && <SetlistSongCard type="metadata" item={item} />}
                            {item.type === 'SCRIPTURE' && (
                              <div className="min-h-7 ml-2 flex flex-nowrap gap-4 items-end w-full">
                                <h3 className="text-md md:text-2xl text-foreground hover:underline">{item?.type}</h3>
                              </div>
                            )}
                          </div>
                          {item.type === 'SONG' && openSongIds.includes(item?.song?.id) && (
                            <>
                              <p className="text-sm text-muted-foreground ml-2">{item.notes}</p>
                              {item.scripture && <p className="text-sm text-muted-foreground ml-2 italic">"{item.scripture}"</p>}
                              <p className="text-sm text-muted-foreground ml-2 italic text-end">{item.reference}</p>
                            </>
                          )}
                          {item.type === 'SCRIPTURE' && openSongIds.includes(item.song.id) && (
                            <>
                              <p className="text-sm text-muted-foreground ml-2">{item.notes}</p>
                              <p className="text-sm text-muted-foreground ml-2 italic">"{item.scripture}"</p>
                              <p className="text-sm text-muted-foreground ml-2 italic text-end">{item.reference}</p>
                            </>
                          )}
                        </div>
                      </div>
                      {item.type === 'SONG' && openSongIds.includes(item?.song?.id) && (
                        <>
                          <SetlistSongCard item={item} />
                          <div className="flex justify-end">
                            <Button
                              className="bg-primary"
                              onClick={(e) => {
                                e.stopPropagation();

                                const container = songRefs.current[item.song.id];
                                if (!container) return;

                                setOpenSongIds((prev) => prev.filter((id) => id !== item.song.id));

                                setTimeout(() => {
                                  container.scrollIntoView({
                                    block: 'start',
                                    behavior: 'smooth', // or "smooth"
                                  });
                                }, 0);
                              }}
                            >
                              <Minimize className="size-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Footer */}
            {setlist.notes && (
              <div className="p-4 bg-card border-l-4 border-primary rounded-xl">
                <div className="w-full">
                  <h3 className="mb-3 text-lg">Annoucement / Notes</h3>
                  <p className="text-sm text-muted-foreground">{setlist.notes}</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex border border-dashed h-40 rounded-md items-center  justify-center  ">
              <Link href={`/user/setlist/edit?id=${setlist.id}`}>
                <Button type="button" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Section
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
