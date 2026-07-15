import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle } from '@/components/ui/field';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useSetlistsContext } from '@/lib/setlist/SetlistsContext';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';
import { format } from 'date-fns';
const Create = () => {
  const { createSetlist } = useSetlistsContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = React.useState<Date>();

  function handleCreate() {
    if (!title.trim()) return; // prevent empty title
    createSetlist(title.trim(), description.trim(), date);
    setTitle('');
    setDescription('');
    setDate(undefined);
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="default" className="cursor-pointer">
          + Create Setlist
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md px-4">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="Title">Setlist Title</FieldLabel>
              <Input
                id="Title"
                autoComplete="off"
                aria-valid
                placeholder="Sunday Service"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <FieldDescription>This will be Setlist Title.</FieldDescription>
            </Field>

            {/* DATE */}
            <Field>
              <FieldLabel htmlFor="date-picker">Event Date</FieldLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <Button id="date-picker" variant="outline" className="w-full justify-between font-normal">
                    {date ? format(date, 'EEEE • MMMM d, yyyy') : 'Pick a date'}

                    <CalendarIcon className="h-4 w-4 opacity-60" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </Field>

            <Field>
              <FieldLabel htmlFor="Description">Description</FieldLabel>
              <Textarea
                id="description"
                autoComplete="off"
                aria-valid
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <Button className="cursor-pointer" onClick={handleCreate}>
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
