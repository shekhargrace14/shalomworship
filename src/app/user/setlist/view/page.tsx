'use client';
import SetlistShow from '@/components/setlist/setlist-show';
import { Spinner } from '@/components/ui/spinner';
import { useSetlistStore } from '@/store/useSetlistStore';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const page = () => {
  const searchParams = useSearchParams();
  const setlistId = searchParams.get('id');
  const [publicSetlist, setPublicSetlist] = useState();
  const setCurrentSetlist = useSetlistStore((s) => s.setCurrentSetlist);
  useEffect(() => {
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
    return <Spinner />;
  }

  return (
    <div className="flex">
      <SetlistShow setlist={publicSetlist} />
    </div>
  );
};

export default page;
