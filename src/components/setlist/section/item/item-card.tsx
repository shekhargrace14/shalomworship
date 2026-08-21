'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SearchSong from '@/components/search/search-song';
import { FormItem, FormSection, ItemType, RemoveItem, UpdateItemField } from '@/types/setlist';
import { ArrowDown, ArrowUp, EllipsisVertical, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { song } from '@prisma/client';
import { toast } from 'sonner';
import TiptapEditor from '@/components/tiptap/TiptapEditor';
import { FormDescription } from '@/components/ui/form';
import { FieldDescription } from '@/components/ui/field';

type Props = {
  section: FormSection;
  updateItemField: UpdateItemField;
  removeItem: RemoveItem;
  moveItem: any;
};

const ItemCard = ({ section, updateItemField, removeItem, moveItem }: Props) => {
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  return (
    <div>
      <div className="space-y-3 ">
        {section.items.map((item, itemIndex) => {
          const isFirst = itemIndex === 0;
          const isLast = itemIndex === section.items.length - 1;
          return (
            <Collapsible defaultOpen={false}>
              <div key={item.id} className="relative bg-muted/20 p-4 border-l border-primary rounded-xl">
                <CollapsibleTrigger asChild>
                  <div className="w-full mb-4 flex items-center justify-between">
                    <span className="absolute -left-3 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary/80 text-sm font-semibold text-primary-foreground">{itemIndex + 1}</span>
                    {/* <h3 className="w-full line-clamp-1">{item.type === 'SONG' ? `Song - ${item.song?.title ?? 'Select a song'}` : item.type === 'SCRIPTURE' ? 'Scripture' : 'Note'}</h3> */}
                    <h3 className="w-full line-clamp-1">{item?.title ? item.title : 'Select song or add title'}</h3>
                    <div className="flex items-center justify-end gap-2">
                      <div className={`flex items-center overflow-hidden transition-all duration-300 ${openActionId === item.id ? 'max-w-40 opacity-100' : 'max-w-0 opacity-0'}`}>
                        <Dialog
                          open={deleteItemId === item.id}
                          onOpenChange={(open) => {
                            if (!open) {
                              setDeleteItemId(null);
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteItemId(item.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Trash2 className="h-5 w-5 text-destructive" />
                                Delete Item
                              </DialogTitle>

                              <DialogDescription>
                                Are you sure you want to delete this Item?
                                <br />
                                <span className="font-medium text-foreground">This action cannot be undone.</span>
                              </DialogDescription>
                            </DialogHeader>

                            <DialogFooter className="flex justify-end gap-2">
                              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                              </Button>

                              <Button
                                type="button"
                                variant="destructive"
                                onClick={() => {
                                  removeItem(section.id, item.id);
                                  setDeleteItemId(null);
                                  setOpenActionId(null);
                                  toast.success('Item deleted');
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Item
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          disabled={isFirst}
                          onClick={(e) => {
                            e.stopPropagation();
                            moveItem(section.id, item.id, 'up');
                          }}
                        >
                          <ArrowUp />
                        </Button>

                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          disabled={isLast}
                          onClick={(e) => {
                            e.stopPropagation();
                            moveItem(section.id, item.id, 'down');
                          }}
                        >
                          <ArrowDown />
                        </Button>
                      </div>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();

                          setOpenActionId((prev) => (prev === item.id ? null : item.id));
                        }}
                      >
                        <EllipsisVertical />
                      </Button>
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="grid  gap-4 grid-cols-1">
                    {/* TYPE */}
                    {/* <div className="flex flex-col md:flex-row justify-between space-y-1">
                      <Label className="text-sm text-muted-foreground">Type</Label>
                      <Select value={item.type} onValueChange={(value) => updateItemField(section.id, item.id, 'type', value as ItemType)}>
                        <SelectTrigger className="w-full md:w-[80%]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SONG">Song</SelectItem>
                          <SelectItem value="NOTE">Note</SelectItem>
                          <SelectItem value="SCRIPTURE">Scripture</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}

                    {/* SEARCH SONG  */}
                    <div className="flex flex-col md:flex-row justify-between space-y-1">
                      <Label className="text-sm text-muted-foreground">Search Song</Label>
                      {/* <HeaderSearch /> */}
                      <div className="w-full md:w-[80%]">
                        <SearchSong
                          value={item.song?.title || item.title}
                          onSelect={(song) => {
                            updateItemField(section.id, item.id, 'song', song);
                            updateItemField(section.id, item.id, 'title', song.title);
                          }}
                        />
                        {/* <p className="text-muted-foreground text-xs">Song Title: {item.song?.title} </p>   */}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between space-y-1">
                      <div className=""></div>

                      <div className="w-full md:w-[80%] grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">Key</Label>
                          <Input placeholder="Key" value={item.key || ''} onChange={(e) => updateItemField(section.id, item.id, 'key', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">BPM</Label>
                          <Input placeholder="BPM" value={item.bpm || ''} onChange={(e) => updateItemField(section.id, item.id, 'bpm', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">Time</Label>
                          <Input placeholder="Time" value={item.timeSignature || ''} onChange={(e) => updateItemField(section.id, item.id, 'timeSignature', e.target.value)} />
                        </div>
                      </div>
                    </div>

                    {/* TITLE */}
                    <div className="flex flex-col md:flex-row justify-between space-y-1">
                      <Label className="text-sm text-muted-foreground">Title</Label>
                      <Input
                        className="w-full md:w-[80%]"
                        placeholder="Title"
                        value={item.title || ''}
                        onChange={(e) => {
                          updateItemField(section.id, item.id, 'title', e.target.value);
                        }}
                      />
                    </div>

                    {item.type !== 'NOTE' && (
                      <>
                        {/* REFERENCE */}
                        <div className="flex flex-col md:flex-row justify-between space-y-1">
                          <Label className="text-sm text-muted-foreground">Reference</Label>
                          <Input className="w-full md:w-[80%]" placeholder="Bible Reference" value={item.reference || ''} onChange={(e) => updateItemField(section.id, item.id, 'reference', e.target.value)} />
                        </div>

                        {/* SCRIPTURE */}
                        <div className="flex flex-col md:flex-row justify-between space-y-1">
                          <Label className="text-sm text-muted-foreground">Scripture</Label>
                          <Input className="w-full md:w-[80%]" placeholder="Reference Scripture" value={item.scripture || ''} onChange={(e) => updateItemField(section.id, item.id, 'scripture', e.target.value)} />
                        </div>
                      </>
                    )}

                    {/* NOTE */}
                    <div className="flex flex-col md:flex-row justify-between space-y-1">
                      <Label className="text-sm text-muted-foreground">Notes</Label>
                      <div className="w-full md:w-[80%]">
                        <TiptapEditor value={item.notes} onChange={(json) => updateItemField(section.id, item.id, 'notes', json)} />
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
};

export default ItemCard;
