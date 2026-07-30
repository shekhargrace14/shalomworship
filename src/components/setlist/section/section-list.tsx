import SectionCard from './section-card';
import { Button } from '@/components/ui/button';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddItem, RemoveItem, UpdateItemField, UpdateSectionField } from '@/types/setlist';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type ItemType = 'SONG' | 'NOTE' | 'SCRIPTURE';
type Visibility = 'PRIVATE' | 'PUBLIC' | 'UNLISTED';

type FormItem = {
  id: string;
  type: ItemType;
  songId: string;
  notes: string;
};
type FormSection = {
  id: string;
  title: string;
  notes: string;
  items: FormItem[];
};

type Props = {
  sections: FormSection[];

  addSection: () => void;

  removeSection: (sectionId: string) => void;

  updateSectionField: UpdateSectionField;

  addItem: AddItem;
  updateItemField: UpdateItemField;

  removeItem: RemoveItem;
};
const SectionList = ({ sections, addSection, removeSection, updateSectionField, addItem, updateItemField, removeItem }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Sections</h2>
          <p className="text-sm text-muted-foreground">Add verses, choruses, notes, and scripture blocks.</p>
        </div>
      </div>
      <div className="space-y-4">
        {sections.map((section, sectionIndex) => (
          <>
            <div className="border-l-4 border-primary rounded-t-xl">
              <div key={section.id} className="overflow-hidden gap-0 rounded-t-xl bg-card px-4 py-6">
                <div className="flex flex-row items-center justify-end gap-4">
                  {/* <GripVertical className="h-4 w-4 text-muted-foreground" /> */}

                  <Button type="button" variant="ghost" size="icon" onClick={() => removeSection(section.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className=" space-y-6  ">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Section Title</Label>
                      <Input placeholder="Verse 1" value={section.title} onChange={(e) => updateSectionField(section.id, 'title', e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label>Section Notes</Label>
                      <Input placeholder="Optional notes for this section" value={section.notes} onChange={(e) => updateSectionField(section.id, 'notes', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <SectionCard section={section} updateSectionField={updateSectionField} addItem={addItem} updateItemField={updateItemField} removeItem={removeItem} />
          </>
        ))}
      </div>
      <div className="flex border border-dashed h-40 rounded-md items-center  justify-center  ">
        <Button type="button" variant="outline" onClick={addSection}>
          <Plus className="mr-2 h-4 w-4" />
          Add Section
        </Button>
      </div>
    </div>
  );
};

export default SectionList;
