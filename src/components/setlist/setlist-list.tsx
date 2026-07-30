import React from 'react';
import SetlistCard from './setlist-card';
import { Setlist } from '@/types/setlist';
interface Props {
  data: Setlist[];
  orientation?: string;
}

const SetlistList = ({ data, orientation }: Props) => {
  return (
    <div>
      {orientation === 'vertical' ? (
        <div className="grid gap-4">
          {data.map((setlist: Setlist) => (
            <SetlistCard key={setlist.id} variant="minimal" setlist={setlist} href={`/user/setlist/view?id=${setlist.id}`} />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3  gap-4">
          {data.map((setlist: Setlist) => (
            <SetlistCard key={setlist.id} setlist={setlist} href={`/user/setlist/view?id=${setlist.id}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SetlistList;
