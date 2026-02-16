"use client";

import { Search, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useSongSearch } from "@/lib/search/useSongSearch";
import Image from "next/image";

export function HeaderSearch() {
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const { search, ready } = useSongSearch();

  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 300);

  const [results, setResults] = useState<any[]>([]);
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);

  // 🔹 Build suggestions (debounced)
  useEffect(() => {
    if (!ready || debounced.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    const res = search(debounced, 6);
    setResults(res);
    setActive(-1);
    setOpen(res.length > 0);
    
    // ✅ ADD { scroll: false } HERE
  router.replace(`/search?q=${encodeURIComponent(debounced)}`, { scroll: false });
  }, [debounced, ready, router]);

  // 🔹 Reset input when leaving search page
  useEffect(() => {
    if (pathname !== "/search") {
      setQuery("");
      setOpen(false);
    }
  }, [pathname]);

  // Auto-focus on page load / return
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]); // ✅ correct


  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault(); // 🔴 critical
      setActive((i) => Math.min(i + 1, results.length - 1));
      inputRef.current?.focus();

    }

    if (e.key === "ArrowUp") {
      setActive((i) => Math.max(i - 1, -1));
    }
    if (e.key === "Enter") {
      if (active >= 0 && results[active]) {
        router.push(`/song/${results[active].slug}`);
      } else {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
      setOpen(false);
    }
  }
  const isSearchPage = pathname !== "/search"

  return (
    <div className="relative w-full max-w-md">
      <div
        className="
              relative flex items-center
              rounded-md border border-input
              bg-background
              transition-all
              focus-within:border-primary
              focus-within:ring-2
              focus-within:ring-primary/40
              focus-within:shadow-md
            "
      >
        <Search
          size={20}
          className={`ml-2 text-muted-foreground ${query ? "cursor-pointer" : ""} `}
          onMouseDown={() => {
            if (query.trim()) {
              router.push(`/search?q=${encodeURIComponent(query)}`);
            }
          }}
        />

        <Input type="search"
          ref={inputRef}
          placeholder="Search songs, artists, scriptures..."
          className=" border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-2 "
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={onKeyDown}
        />
        {query && (
          <X size={20}
            className=" mr-2 text-2xl text-foreground cursor-pointer"
            onClick={() => {

              setQuery("");
              setOpen(false);
            }}
          />
        )}
      </div>


      {/* 🔹 Suggestions dropdown */}
      {isSearchPage && open && results.length > 0 && (
        <div className="absolute z-50 mt-1 p-1 w-full rounded-md bg-card shadow">
          {results.map((r, i) => (
            <div
              key={r.id}
              className={`px-1 py-1 cursor-pointer hover:bg-ring rounded-md flex gap-2 ${i === active ? "bg-ring" : ""
                }`}
              onMouseDown={() => {

                router.push(`/song/${r.slug}`)
                setOpen(false); // to close the suggestions dropdown
              }

              }
            >
              <Image
                src={r.image}
                alt={r.title}
                className="w-20 object-cover rounded-md"
                width={40}
                height={40}
              />
              <div className="flex flex-col ">
                <div className="font-medium">{r.title}</div>
                <div className="text-xs opacity-70">
                  {r.artist}
                  {r.status === "upcoming" && " • Coming Soon"}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
