'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@/components/ui/button';

type Props = {
  value?: any;
  onChange?: (json: any) => void;
};

export default function TiptapEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],

    content: value || {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Start writing...',
            },
          ],
        },
      ],
    },

    immediatelyRender: false,

    onUpdate({ editor }) {
      const json = editor.getJSON();

      onChange?.(json);
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-md">
      {/* Toolbar */}
      <div className="flex gap-2 border-b p-2 flex-wrap">
        <Button type="button" variant="outline" size="sm" onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </Button>

        <Button type="button" variant="outline" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </Button>

        <Button type="button" variant="outline" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </Button>

        <Button type="button" variant="outline" size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          Bullet
        </Button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="p-2 prose dark:prose-invert max-w-none" />
    </div>
  );
}
