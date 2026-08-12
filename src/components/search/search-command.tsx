'use client';

import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../ui/dialog';
import { Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useSongSearch } from '@/lib/search/useSongSearch';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchCommand({ open, onOpenChange }: any) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(-1);
  const [results, setResults] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 300);

  const { search, ready } = useSongSearch();

  // 🔹 Build suggestions (debounced)
  useEffect(() => {
    if (!ready || debounced.length < 2) {
      setResults([]);
      return;
    }
    const res = search(debounced);
    setResults(res);
    setActive(-1);
  }, [debounced, ready]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.metaKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onOpenChange(true);
      }

      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onOpenChange]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (active >= 0 && results[active]) {
        router.push(`/song/${results[active].slug}`);
        return;
      }

      // Offline: stay on current page and use dropdown results
      if (!navigator.onLine) {
        return;
      }

      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }

      return;
    }

    if (!open) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    }
  }
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-card w-12/12">
          <div
            className="
                          flex items-center
                          rounded-md border border-input
                          bg-background!
                          transition-all
                          focus-within:border-primary
                          focus-within:ring-2
                          focus-within:ring-primary/40
                          focus-within:shadow-md
                          px-2 py-1
                          mt-4
                        "
          >
            <Search
              size={20}
              className={`ml-2 text-muted-foreground  ${query ? 'cursor-pointer' : ''} `}
              onMouseDown={() => {
                if (query.trim()) {
                  router.push(`/search?q=${encodeURIComponent(query)}`);
                }
              }}
            />

            <Input
              type="search"
              ref={inputRef}
              placeholder="Search songs, artists, scriptures..."
              className=" border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-2 bg-none"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onFocus={() => query}
              onKeyDown={onKeyDown}
            />

            {query && (
              <X
                size={20}
                className=" mr-2 text-2xl text-foreground cursor-pointer"
                onClick={() => {
                  setQuery('');
                  onOpenChange(false);
                }}
              />
            )}
          </div>
          <div className={`h-[60vh] overflow-y-auto custom-scrollbar`}>
            {results.map((song, i) => {
              return (
                <div
                  key={song.id}
                  className={`group px-1 py-1 hover:bg-ring rounded-md flex gap-2 justify-between items-center 
                                            ${i === active ? 'bg-ring' : ''}
                                            `}
                >
                  <Link
                    href={`/song/${song.slug}`}
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/song/${song.slug}`);
                    }}
                  >
                    <div className="flex gap-2 ">
                      <Image src={song.image} alt={song.title} className="w-20 object-cover rounded-md" width={40} height={40} />
                      <div className="flex flex-col ">
                        <div className="font-medium">{song.title}</div>
                        <div className="text-xs text-gray-500 group-hover:text-foreground">
                          {song?.channel}
                          {song.status === 'upcoming' && ' • Coming Soon'}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
