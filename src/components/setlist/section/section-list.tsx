import SectionCard from './section-card';
import { Button } from '@/components/ui/button';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddItem, FormSection, RemoveItem, UpdateItemField, UpdateSectionField } from '@/types/setlist';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

type Props = {
  sections: FormSection[];

  addSection: () => void;

  removeSection: (sectionId: string) => void;

  updateSectionField: UpdateSectionField;

  addItem: AddItem;
  updateItemField: UpdateItemField;

  removeItem: RemoveItem;
  moveItem: any;
  handleSubmit: any;
};
const SectionList = ({ sections, addSection, removeSection, updateSectionField, addItem, updateItemField, removeItem, moveItem, handleSubmit }: Props) => {
  const [open, setOpen] = useState(false);
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
          <div key={section.id}>
            <div className="border-l-4 border-primary rounded-t-xl">
              <div className="overflow-hidden gap-0 rounded-t-xl bg-card px-4 py-6">
                <div className="flex flex-row items-center justify-end gap-4">
                  {/* <GripVertical className="h-4 w-4 text-muted-foreground" /> */}
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button type="button" variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Trash2 className="h-5 w-5 text-destructive" />
                          Delete Section
                        </DialogTitle>

                        <DialogDescription>
                          Are you sure you want to delete this section?
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
                            removeSection(section.id);
                            setOpen(false);
                            toast.success('Section deleted');
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Section
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className=" space-y-6  ">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Section Title</Label>
                      <Input placeholder="Verse 1" value={section.title} onChange={(e) => updateSectionField(section.id, 'title', e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Section Notes</Label>
                      <Input placeholder="Optional notes for this section" value={section.notes} onChange={(e) => updateSectionField(section.id, 'notes', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <SectionCard handleSubmit={handleSubmit} section={section} updateSectionField={updateSectionField} addItem={addItem} updateItemField={updateItemField} removeItem={removeItem} moveItem={moveItem} />
          </div>
        ))}
      </div>
      <div className="flex border border-dashed h-40 rounded-md items-center  justify-center  ">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            (addSection(), handleSubmit());
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Section
        </Button>
      </div>
    </div>
  );
};

export default SectionList;
