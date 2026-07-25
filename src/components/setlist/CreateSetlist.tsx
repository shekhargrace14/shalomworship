'use client';

import { HeaderSearch } from '../search/HeaderSearch';
import { useSetlistsContext } from '@/lib/setlist/SetlistsContext';
import Create from './Create';
// import Setlist from './Setlist';

export function CreateSetlist() {
  const { setlists, createSetlist, deleteSetlist } = useSetlistsContext();

  return (
    <div className="m-4">
      <div className="flex justify-between my-4">
        <h1 className="text-3xl font-semibold">
          Manage Setlists<span className="text-base text-muted-foreground">(beta)</span>{' '}
        </h1>
      </div>
      <section className="flex justify-end mb-4">
        <Create />
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-4">
        {/* {[...setlists].reverse().map((setlist, index) => (
          <Setlist key={index} setlist={setlist} />
        ))} */}
      </div>
    </div>
  );
}
