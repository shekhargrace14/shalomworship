'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { EditableItemField, FormItem, FormSection, FullSetlist, ItemType, Metadata, Setlist, SetlistItem, SetlistSection, Visibility } from '@/types/setlist';
import { Save } from 'lucide-react';
import { Button } from '../ui/button';
import SetlistMetadata from './setlist-edit-metadata';
import { SetlistButtonDelete} from './button/setlist-button-delete';
// import SectionList from './section/section-list';
import { toast } from 'sonner';
import { useChannelStore } from '@/store/useChannelStore';
import { useSetlistStore } from '@/store/useSetlistStore';
import SectionList from './section/section-list';
import SetlistCardMetadata from './setlist-card-metadata';

// type EditableItemField = Pick<FormItem, 'type' | 'songId' | 'song' | 'notes' | 'key' | 'bpm' | 'time' | 'scripture'>;

function createItem(type: ItemType = 'SONG'): FormItem {
  return {
    id: crypto.randomUUID(),
    type,

    order: 0,

    song: null,

    key: '',
    bpm: 0,
    timeSignature: '',
    duration: 0,
    reference: '',
    scripture: '',

    notes: '',
  };
}

function createSection(): FormSection {
  return {
    id: crypto.randomUUID(),
    title: '',
    notes: '',
    order: 0,
    items: [createItem()],
  };
}

const SetlistEditor = ({ data }: { data: Setlist }) => {
  const router = useRouter();

  const currentChannel = useChannelStore((s) => s.currentChannel);
  const channelId = currentChannel?.id;
  const currentSetlist = useSetlistStore((s) => s.currentSetlist);
  const setlistId = currentSetlist?.id;

  const [metadata, setMetadata] = useState<Metadata>({
    title: data.title ?? '',
    theme: data.theme ?? '',
    description: data.description ?? '',
    scripture: data.scripture ?? '',
    notes: data.notes ?? '',
    eventAt: data.eventAt ? new Date(data.eventAt) : undefined,
    visibility: (data.visibility as Visibility) ?? 'PRIVATE',
  });

  const [loading, setLoading] = useState(false);

  const [sections, setSections] = useState<FormSection[]>([createSection()]);

  useEffect(() => {
    async function loadSetlist() {
      try {
        const res = await fetch(`/api/channel/${channelId}/setlists/${setlistId}`);
        const json = await res.json();
        const currentSetlist = json.data;

        if (currentSetlist) {
          // setInitialData(currentSetlist);

          // Populate master details fields
          setMetadata({
            title: currentSetlist.title ?? '',
            theme: currentSetlist.theme ?? '',
            description: currentSetlist.description ?? '',
            scripture: currentSetlist.scripture ?? '',
            notes: currentSetlist.notes ?? '',
            eventAt: currentSetlist.eventAt ? new Date(currentSetlist.eventAt) : undefined,
            visibility: (currentSetlist.visibility as Visibility) ?? 'PRIVATE',
          });

          // Populate nested sections and items if they exist in the incoming database record
          if (currentSetlist.sections && currentSetlist.sections.length > 0) {
            const currentSetlist: FullSetlist = json.data;
            const mappedSections: FormSection[] = currentSetlist.sections.map((sec: SetlistSection) => ({
              id: crypto.randomUUID(),
              order: sec.order,

              title: sec.title ?? '',
              notes: sec.notes ?? '',
              items: sec.items.length
                ? sec.items.map((item: SetlistItem) => ({
                    ...item,
                    id: crypto.randomUUID(),
                    order: item.order ?? 0,

                    song: item.song,

                    key: item.key ?? '',
                    bpm: item.bpm ?? 0,
                    timeSignature: item.timeSignature ?? '',
                    duration: item.duration ?? 0,

                    reference: item.reference ?? '',
                    scripture: item.scripture ?? '',

                    notes: item.notes ?? '',
                  }))
                : [createItem()],
            }));
            setSections(mappedSections);
          }
        }
      } catch (err) {
        console.error('Failed to load initial setlist data:', err);
      }
    }
    loadSetlist();
  }, [channelId]);

  const canSave = useMemo(() => {
    return metadata.title.trim().length > 0 && sections.length > 0;
  }, [metadata.title, sections]);

  function addSection() {
    setSections((prev) => [...prev, createSection()]);
  }

  function removeSection(sectionId: string) {
    setSections((prev) => prev.filter((section) => section.id !== sectionId));
  }

  function updateSectionField(sectionId: string, key: keyof Pick<FormSection, 'title' | 'notes'>, value: string) {
    setSections((prev) => prev.map((section) => (section.id === sectionId ? { ...section, [key]: value } : section)));
  }

  function addItem(sectionId: string, type: ItemType = 'SONG') {
    setSections((prev) => prev.map((section) => (section.id === sectionId ? { ...section, items: [...section.items, createItem(type)] } : section)));
  }

  function removeItem(sectionId: string, itemId: string) {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.filter((item) => item.id !== itemId),
            }
          : section,
      ),
    );
  }

  function updateItemField(sectionId: string, itemId: string, key: keyof EditableItemField, value: EditableItemField[keyof EditableItemField]) {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      [key]: value,
                    }
                  : item,
              ),
            }
          : section,
      ),
    );
  }

  function moveItem(sectionId: string, itemId: string, direction: 'up' | 'down') {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;

        const items = [...section.items];

        const currentIndex = items.findIndex((item) => item.id === itemId);

        if (currentIndex === -1) return section;

        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

        // Prevent moving past the first/last item
        if (targetIndex < 0 || targetIndex >= items.length) {
          return section;
        }

        // Swap items
        [items[currentIndex], items[targetIndex]] = [items[targetIndex], items[currentIndex]];

        // Recalculate order
        const reorderedItems = items.map((item, index) => ({
          ...item,
          order: index + 1,
        }));

        return {
          ...section,
          items: reorderedItems,
        };
      }),
    );
  }

  async function handleSubmit() {
    if (!canSave) return;

    setLoading(true);

    try {
      const payload = {
        title: metadata.title.trim(),
        theme: metadata.theme.trim() || null,
        description: metadata.description.trim() || null,
        scripture: metadata.scripture.trim() || null,
        eventAt: metadata.eventAt ? metadata.eventAt.toISOString() : null,
        visibility: metadata.visibility,
        notes: metadata.notes.trim() || null,

        sections: sections.map((section, sectionIndex) => ({
          id: section.id,
          title: section.title.trim(),
          order: sectionIndex + 1,
          notes: section.notes.trim() || null,

          items: section.items.map((item, itemIndex) => ({
            id: item.id,
            type: item.type,
            order: itemIndex + 1,

            song: item.song,

            key: item.key?.trim() || null,
            bpm: item.bpm || null,
            timeSignature: item.timeSignature?.trim() || null,
            duration: item.duration || null,

            reference: item.reference?.trim() || null,
            scripture: item.scripture?.trim() || null,

            notes: item.notes.trim() || null,
          })),
        })),
      };

      console.log(payload, 'SetlistEditor');

      const res = await fetch(`/api/channel/${channelId}/setlists/${setlistId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to update setlist');
      }
      toast.success(result.message);

      // router.push(`/user/setlist/edit?id=${setlistId}`);
    } catch (error: any) {
      console.error(error);

      // alert(error instanceof Error ? error.message : 'Something went wrong');
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  if (!channelId) {
    return;
  }
  if (!setlistId) {
    return;
  }
  return (
    <>
      <SetlistCardMetadata metadata={metadata} loading={loading} handleSubmit={handleSubmit} canSave={canSave} />
      <div className="p-4 space-y-8 bg-background">
        <SetlistMetadata metadata={metadata} setMetadata={setMetadata} loading={loading} canSave={canSave} handleSubmit={handleSubmit} channelId={channelId} />

        <SectionList handleSubmit={handleSubmit} sections={sections} addSection={addSection} removeSection={removeSection} updateSectionField={updateSectionField} addItem={addItem} updateItemField={updateItemField} removeItem={removeItem} moveItem={moveItem} />
        <div className="flex justify-end">
          <SetlistButtonDelete channelId={channelId} setlistId={setlistId} setlistTitle={metadata.title} />
        </div>
      </div>
    </>
  );
};

export default SetlistEditor;
