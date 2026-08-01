'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SearchSong from '@/components/search/search-song';
import { FormItem, FormSection, ItemType, RemoveItem, UpdateItemField } from '@/types/setlist';
import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react';

type Props = {
  section: FormSection;
  updateItemField: UpdateItemField;
  removeItem: RemoveItem;
};

const ItemCard = ({ section, updateItemField, removeItem }: Props) => {
  return (
    <div>
      <div className="space-y-3 ">
        {section.items.map((item, itemIndex) => (
          <div key={item.id} className="relative bg-muted/20 p-4 border-l border-primary rounded-xl">
            <div className="mb-4 flex items-center justify-end">
              <span className="absolute -left-3 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary/80 text-sm font-semibold text-primary-foreground">{itemIndex + 1}</span>

              <div className="w-full flex items-center justify-end gap-3">
                {/* <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={(e) => {
                    // (e.stopPropagation(), onMoveUp(item.id));
                  }}
                >
                  <ArrowUp />
                </Button>

                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={(e) => {
                    // (e.stopPropagation(), onMoveDown(item.id));
                  }}
                >
                  <ArrowDown />
                </Button> */}
                <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(section.id, item.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>

            <div className="grid  gap-4 grid-cols-1">
              {/* ORDER
              <div className="space-y-2 ">
                <Label>Order</Label>
                <Input value={itemIndex + 1} disabled />
              </div> */}

              {/* TYPE */}
              <div className="flex flex-col md:flex-row justify-between space-y-1">
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
              </div>
              {item.type === 'SONG' ? (
                <>
                  {/* SEARCH SONG  */}
                  <div className="flex flex-col md:flex-row justify-between space-y-1">
                    <Label className="text-sm text-muted-foreground">Search Song</Label>
                    {/* <HeaderSearch /> */}
                    <div className="w-full md:w-[80%]">
                      <SearchSong
                        value={item.songId || ''}
                        onSelect={(song) => {
                          // updateItemField(section.id, item.id, "song", song);
                          updateItemField(section.id, item.id, 'songId', song.id);
                        }}
                      />
                      <p className="text-muted-foreground text-xs">Song ID: {item.songId} </p>
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
                        <Label className="text-sm text-muted-foreground">Time Signature</Label>
                        <Input placeholder="Time" value={item.timeSignature || ''} onChange={(e) => updateItemField(section.id, item.id, 'timeSignature', e.target.value)} />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}

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
                <Input className="w-full md:w-[80%]" placeholder="Optional notes for the song..." value={item.notes || ''} onChange={(e) => updateItemField(section.id, item.id, 'notes', e.target.value)} />
              </div>

              {/* DURATION  */}
              <div className="flex flex-col md:flex-row justify-between space-y-1">
                <Label className="text-sm text-muted-foreground">Duration</Label>
                <Input className="w-full md:w-[80%]" placeholder="Duration" value={item.duration || ''} onChange={(e) => updateItemField(section.id, item.id, 'duration', e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemCard;
