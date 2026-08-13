'use client ';
import React, { useEffect, useState } from 'react';
import { Search as S, X } from 'lucide-react';
import { Input } from '../ui/input';
import SearchCommand from './search-command';
import { useIsMac } from './useIsMac';

interface SearchProps {
  redirectCheck?: boolean;
  isMobile?: boolean;
  setlistId?: string;
}

const Search = ({ redirectCheck, setlistId, isMobile }: SearchProps) => {
  const isMac = useIsMac();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';

      if (!isShortcut) return;

      event.preventDefault();
      setOpen(true);
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <div>
      {isMobile ? (
        <S size={20} className="ml-2 text-muted-foreground" onClick={() => setOpen(true)} />
      ) : (
        <div
          className="
          flex items-center rounded-full border border-input
          bg-background px-2 py-1
          transition-all
          focus-within:border-primary
          focus-within:ring-2
          focus-within:ring-primary/40
          focus-within:shadow-md
        "
          onClick={() => setOpen(true)}
        >
          <S size={20} className="ml-2 text-muted-foreground" />

          <Input
            type="search"
            placeholder="Search songs, artists, scriptures..."
            className="
            border-0 bg-none! pl-2
            focus-visible:ring-0
            focus-visible:ring-offset-0
          "
          />

          <kbd className="hidden w-fit px-2 py-1 md:flex items-center gap-0.5">
            <span className="text-base mt-0.5">{isMac ? '⌘' : 'Ctrl'}</span>

            <span className="mt-0.5 text-xs">K</span>
          </kbd>
        </div>
      )}

      <SearchCommand open={open} onOpenChange={setOpen} redirectCheck={redirectCheck} setlistId={setlistId} />
    </div>
  );
};

export default Search;
