"use client";

import Menu from "@/components/layout/Menu";
import { useSongSearch } from "@/lib/search/useSongSearch";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const { search, ready } = useSongSearch();
  const params = useSearchParams();
  const q = params.get("q") ?? "";

  const [query, setQuery] = useState(q);
  const [results, setResults] = useState<any[]>([]);

  /**
   * 🔹 Sync URL → state
   * Handles:
   * - direct load
   * - back / forward navigation
   */
  useEffect(() => {
    setQuery(q);
  }, [q]);

  /**
   * 🔹 Run search when:
   * - query changes
   * - search index becomes ready
   */
  useEffect(() => {
    if (!ready || !query) {
      setResults([]);
      return;
    }

    setResults(search(query, 20));
  }, [query, ready]);

  return (
    <div className="h-[90vh] overflow-y-auto custom-scrollbar ">
      {/* <Menu /> */}

      {query && results.length === 0 && ready && (
        <div className="mt-4 mx-2 text-muted-foreground ">
          No results found for "<b>{query}"</b>
        </div>
      )}
  {results.length > 0 &&(

    
    <h2 className="p-2">Search result of "{query}"</h2>
  )}
      {results.length > 0 && (
        <div className="p-2 rounded-lg bg-muted shadow  w-full sm:w-3/5 ">
          {results.map((r) => (
            <Link
              key={r.id}
              href={`/song/${r.slug}`}
              className="block"
            >
              <div className="px-2 py-2 rounded-md flex gap-3 hover:bg-ring cursor-pointer">
                <Image
                  src={r.image}
                  alt={r.title}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />

                <div className="flex flex-col">
                  <div className="font-medium">{r.title}</div>
                  <div className="text-xs opacity-70">
                    {r.artist}
                    {r.status === "upcoming" && " • Coming Soon"}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
