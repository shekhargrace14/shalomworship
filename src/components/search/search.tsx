'use client ';
import React, { useEffect, useState } from 'react';
import { Search as S, X } from 'lucide-react';
import { Input } from '../ui/input';
import SearchCommand from './search-command';

interface SearchProps {
  redirectCheck?: boolean;
  mobileView?: boolean;
  setlistId?: string;
}

const Search = ({ redirectCheck, setlistId, mobileView }: SearchProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <>
      {mobileView ? (
        <S size={20} className={`ml-2 text-muted-foreground `} />
      ) : (
        <div
          className="
              flex items-center
              rounded-full border border-input
              bg-background
              transition-all
              focus-within:border-primary
              focus-within:ring-2
              focus-within:ring-primary/40
              focus-within:shadow-md
              px-2 py-1
            "
          onClick={() => setOpen(true)}
        >
          <S size={20} className={`ml-2 text-muted-foreground `} />
          <Input type="search" placeholder="Search songs, artists, scriptures..." className=" border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-2 bg-none!" />
          <kbd className="hidden w-fit px-2 py-1   md:flex gap-0.5">
            <p className="text-sm">⌘</p>
            <p className="text-xs mt-0.5">K</p>
          </kbd>
        </div>
      )}

      <SearchCommand open={open} onOpenChange={setOpen} redirectCheck={redirectCheck} setlistId={setlistId} />
    </>
  );
};

export default Search;
