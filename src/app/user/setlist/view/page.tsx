'use client';
import SetlistShow from '@/components/setlist/setlist-show';
import { Spinner } from '@/components/ui/spinner';
import { useSetlistStore } from '@/store/useSetlistStore';
import { Setlist } from '@/types/setlist';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const page = () => {
  const searchParams = useSearchParams();
  const setlistId = searchParams.get('id');
  // const [publicSetlist, setPublicSetlist] = useState();
  const [publicSetlist, setPublicSetlist] = useState<Setlist | null>(null);
  const setCurrentSetlist = useSetlistStore((s) => s.setCurrentSetlist);
  useEffect(() => {
    if (!setlistId) return;
    async function loadCurrentSetlist() {
      const res = await fetch(`/api/setlist/${setlistId}`);
      const data = await res.json();
      if (data.success) {
        setCurrentSetlist(data.data);
        setPublicSetlist(data.data);
      }
    }
    loadCurrentSetlist();
  }, [setlistId]);

  const currentSetlist = useSetlistStore((s) => s.currentSetlist);

  if (!publicSetlist) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex">
      <SetlistShow setlist={publicSetlist} />
    </div>
  );
};

export default page;
