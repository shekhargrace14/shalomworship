'use client';
import SetlistEditor from '@/components/setlist/setlist-editor';
import { useSetlistStore } from '@/store/useSetlistStore';
import { Metadata } from '@/types/setlist';
import { useParams } from 'next/navigation';
import React from 'react';

const page = () => {
  const currentSetlist = useSetlistStore((state) => state.currentSetlist);

  if (!currentSetlist) {
    return;
  }

  return (
    <div className="p-4">
      Editor
      <SetlistEditor data={currentSetlist} />
    </div>
  );
};

export default page;
