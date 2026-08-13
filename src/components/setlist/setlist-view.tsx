'use client';

import { CalendarDays, Edit, Minimize, Plus } from 'lucide-react';

import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '../ui/button';

import { Setlist } from '@/types/setlist';
import SetlistSongCard from './setlist-song-card';

import { useRef, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSetlistStore } from '@/store/useSetlistStore';

import ButtonShare from '../shared/button-share';
import { SetlistButton } from './button/setlist-button';
import TiptapContent from '../tiptap/tiptap-content';

interface Props {
  setlist: Setlist | null;
}

export default function SetlistShow({ setlist }: Props) {
  if (!setlist) return null;

  const router = useRouter();

  /*
   * Stores IDs of currently expanded items.
   *
   * Example:
   * ["item-1", "item-4", "item-7"]
   *
   * This allows multiple items to stay open.
   */
  const [openItemIds, setOpenItemIds] = useState<string[]>([]);

  /*
   * Used for scrolling back to the item after closing
   * the full song.
   */
  const songRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const channelAllSetlists = useSetlistStore((state) => state.channelAllSetlists);

  const isUserSetlist = channelAllSetlists.some((s) => s.id === setlist.id);

  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);

  /*
   * Toggle a single item.
   */
  const toggleItem = (itemId: string) => {
    setOpenItemIds((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };

  /*
   * Open / close all SONG items inside one section.
   *
   * Non-song items are not affected by section toggle.
   */
  const toggleSection = (section: any) => {
    const songIds = (section.items ?? [])
      .filter((item: any) => item.type === 'SONG')
      .map((item: any) => item.id)
      .filter(Boolean);

    if (!songIds.length) return;

    setOpenItemIds((prev) => {
      const allOpen = songIds.every((id: string) => prev.includes(id));

      if (allOpen) {
        // Close all songs in this section
        return prev.filter((id) => !songIds.includes(id));
      }

      // Open all songs in this section
      return [...new Set([...prev, ...songIds])];
    });
  };

  return (
    <div className="relative w-full rounded-xl p-0 overflow-hidden">
      {/* ================= HEADER ================= */}

      <div
        className="bg-background p-4 py-8 pt-24 md:pt-40"
        style={{
          backgroundImage: `linear-gradient(to bottom, oklch(68.699% 0.11763 191.228), transparent)`,
        }}
      >
        {/* Share */}

        <div className="absolute right-4 top-4">
          <ButtonShare />
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-end h-40 md:h-fit">
          {/* Metadata */}

          <div>
            <h1 className="text-3xl md:text-4xl tracking-tight font-medium">{setlist.title}</h1>

            {setlist.theme && <p className="text-muted-foreground">{setlist.theme}</p>}

            <div className="mt-2 flex gap-2">
              {setlist.eventAt && (
                <Badge variant="outline" className="h-4 flex items-center gap-1 border-accent/70 px-2 py-2 bg-primary/10">
                  <CalendarDays className="h-2 w-2 text-accent" />

                  <span className="text-accent text-[12px]">{format(new Date(setlist.eventAt), 'EEE, MMM d')}</span>
                </Badge>
              )}
            </div>
          </div>

          {/* Edit */}

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

      {/* ================= SETLIST CONTENT ================= */}

      <div className="relative p-4 space-y-8 bg-background">
        {/* Description */}

        {(setlist.description || setlist.scripture) && (
          <div className="max-w-xl border-l pl-4 py-2 flex flex-col rounded-md">
            {setlist.description && <p className="text-sm text-muted-foreground italic">"{setlist.description}"</p>}

            {setlist.scripture && <p className="text-sm text-muted-foreground italic text-end mt-2">{setlist.scripture}</p>}
          </div>
        )}

        {/* ================= SECTIONS ================= */}

        {setlist.sections?.length > 0 ? (
          <>
            {setlist.sections.map((section: any, sectionIndex: number) => {
              return (
                <div key={section.id ?? `section-${sectionIndex}`} className="space-y-4">
                  {/* ================= SECTION HEADER ================= */}

                  <div className="p-4 bg-card border-l-4 border-primary rounded-xl cursor-pointer hover:bg-muted/40 transition-colors" onClick={() => toggleSection(section)}>
                    <h2 className="text-xl tracking-wide">{section.title || 'Songs'}</h2>

                    {section.notes && <p className="mt-1 text-sm text-muted-foreground">{section.notes}</p>}
                  </div>

                  {/* ================= ITEMS ================= */}

                  <div className="space-y-3">
                    {section.items?.map((item: any, itemIndex: number) => {
                      /*
                       * IMPORTANT:
                       *
                       * Use item.id for expansion.
                       *
                       * Do NOT use item.song.id because
                       * NOTE / SCRIPTURE may not have song.
                       */
                      const itemId = item.id ?? `${sectionIndex}-${itemIndex}`;

                      const isOpen = openItemIds.includes(itemId);

                      return (
                        <div key={itemId} className="transition-colors group space-y-4">
                          {/* ================= ITEM HEADER ================= */}

                          <div
                            ref={(el) => {
                              /*
                               * Only songs need
                               * song references.
                               */
                              if (item.type === 'SONG' && item.song?.id) {
                                songRefs.current[item.song.id] = el;
                              }
                            }}
                            className="pl-2 md:pl-4 w-full cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();

                              toggleItem(itemId);
                            }}
                          >
                            <div
                              className={`
                                    relative
                                    w-full
                                    flex
                                    flex-col
                                    gap-3
                                    p-4
                                    bg-card
                                    border-l
                                    border-primary
                                    group-hover:bg-muted/40
                                    transition-colors
                                    ${isOpen ? 'rounded-t-xl' : 'rounded-xl'}
                                  `}
                            >
                              {/* TITLE */}

                              <div className="flex items-center">
                                <span className="absolute -left-3 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/80 text-sm font-semibold text-primary-foreground">{item.order}</span>

                                {item.type === 'SONG' ? (
                                  <SetlistSongCard type="metadata" item={item} />
                                ) : (
                                  <div className="ml-2">
                                    <h3 className="text-md md:text-xl text-foreground">{item.type}</h3>
                                  </div>
                                )}
                              </div>

                              {/* ================= EXPANDED DETAILS ================= */}

                              {isOpen && (
                                <div className="space-y-2 ml-2">
                                  {item.notes && (
                                    <p className="text-sm text-muted-foreground">
                                      {/* {item.notes} */}
                                      <TiptapContent content={item.notes} />
                                    </p>
                                  )}
                                  {item.scripture && <p className="text-sm text-muted-foreground italic">"{item.scripture}"</p>}

                                  {item.reference && <p className="text-sm text-muted-foreground italic text-end">{item.reference}</p>}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* ================= SONG CONTENT ================= */}

                          {item.type === 'SONG' && isOpen && (
                            <div className="space-y-4">
                              <SetlistSongCard item={item} />

                              {/* Minimize */}

                              <div className="flex justify-end">
                                <Button
                                  type="button"
                                  className="bg-primary"
                                  onClick={(e) => {
                                    e.stopPropagation();

                                    /*
                                     * Close this item.
                                     */
                                    setOpenItemIds((prev) => prev.filter((id) => id !== itemId));

                                    /*
                                     * Scroll back
                                     * to the song header.
                                     */
                                    const container = item.song?.id ? songRefs.current[item.song.id] : null;

                                    setTimeout(() => {
                                      container?.scrollIntoView({
                                        block: 'start',
                                        behavior: 'smooth',
                                      });
                                    }, 0);
                                  }}
                                >
                                  <Minimize className="size-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* ================= FOOTER NOTES ================= */}

            {setlist.notes && (
              <div className="p-4 bg-card border-l-4 border-primary rounded-xl">
                <h3 className="mb-3 text-lg">Announcement / Notes</h3>

                <p className="text-sm text-muted-foreground">{setlist.notes}</p>
              </div>
            )}
          </>
        ) : (
          /* ================= EMPTY SETLIST ================= */

          <div className="flex border border-dashed h-40 rounded-md items-center justify-center">
            <Link href={`/user/setlist/edit?id=${setlist.id}`}>
              <Button type="button" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Section
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
