import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useSetlistsContext } from '@/lib/setlist/SetlistsContext';
const Create = () => {

    const { createSetlist  } = useSetlistsContext();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventAt, setEventAt] = useState("");
    const [open, setOpen] = useState(false)

    function handleCreate() {
        if (!title.trim()) return; // prevent empty title
        createSetlist(title.trim(), description.trim());
        setTitle("");
        setDescription("");
        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}  >
            <DialogTrigger>
                <Button variant="default" className='cursor-pointer'>+ Create Setlist</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md px-4">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                </DialogHeader>
                <FieldSet>
                    {/* <FieldLegend>Profile</FieldLegend> */}
                    {/* <FieldDescription>This appears on invoices and emails.</FieldDescription> */}
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="Title">Setlist Title</FieldLabel>
                            <Input id="Title" autoComplete="off" aria-valid placeholder="Sunday Service" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                            <FieldDescription>This will be Setlist Title.</FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="Description">Description</FieldLabel>
                            <Textarea id="description" autoComplete="off" aria-valid value={description} onChange={(e) => { setDescription(e.target.value) }} />
                            {/* <FieldError>Choose another username.</FieldError> */}
                        </Field>
                        {/* <Field orientation="horizontal">
                                    <Switch id="newsletter" />
                                    <FieldLabel htmlFor="newsletter">Subscribe to the newsletter</FieldLabel>
                                </Field> */}
                    </FieldGroup>
                </FieldSet>
                <Button className='cursor-pointer' onClick={handleCreate} >Create</Button>
            </DialogContent>
        </Dialog>
    )
}

export default Create