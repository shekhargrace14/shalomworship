import { generateHTML } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import type { JSONContent } from '@tiptap/core';

type Props = {
  content: JSONContent | null;
};

export default function TiptapContent({ content }: Props) {
  if (!content || content.type !== 'doc') {
    console.error('Invalid Tiptap document:', content);
    return null;
  }

  const html = generateHTML(content, [StarterKit]);

  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}
