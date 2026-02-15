"use client"
import Menu from '@/components/layout/Menu';
import { useSongSearch } from '@/lib/search/useSongSearch';
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import React, { useEffect, useState } from 'react'

const page = () => {
  const router = useRouter();
  const { search } = useSongSearch();
  const params = useSearchParams();
  const q = params.get("q") ?? "";

  const [query, setQuery] = useState(q);
  const [results, setResults] = useState<any[]>([]);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setResults(search(query, 8));
    setActive(0);
  }, [query]);
  useEffect(() => {
    setQuery(q);
  }, [q]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) return;

    if (e.key === "ArrowDown") {
      setActive((i) => Math.min(i + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      setActive((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter") {
      if (results[active]) {
        router.push(`/song/${results[active].slug}`);
      } else {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
      setOpen(false);
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  }
  console.log(results, "results")
  return (
    // <div className="bg-background  rounded-lg h-[90vh] overflow-y-auto custom-scrollbar">
    <div className=' h-[90vh] overflow-y-auto custom-scrollbar p-4'>


    <Menu/>
      {results.length > 0 ? (
        <div className=" mt-2  p-2 rounded-lg bg-muted shadow ">
          {results.map((r, i) => (
            <div
              key={r.id}
              className={`px-2 py-1 cursor-pointer hover:bg-ring rounded-md ${i === active ? "bg-muted" : ""
                }`}
              onMouseDown={() =>
                router.push(`/song/${r.slug}`)
              }
            >
              <div className="flex gap-2 items-end gap-2 ">
                <div className="font-medium">{r.title}</div>
              </div>
              <div className="text-xs opacity-70">
                {r.artist}
                {r.status === "upcoming" && " • Coming Soon"}
              </div>
            </div>
          ))}
          {/* <div
            className="p-2 text-right text-sm text-primary cursor-pointer hover:bg-ring rounded-md"
            onMouseDown={() =>
              router.push(`/search?q=${encodeURIComponent(query)}`)
            }
          >
            View all results →
          </div> */}
        </div>
      ) : " No search  "}
    </div>

  )
}

export default page