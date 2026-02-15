import { Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/useDebounce";

export function HeaderSearch() {
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 300)

  useEffect(() => {
    if (!debounced) return;

    router.push(`/search?q=${encodeURIComponent(debounced)}`);
  }, [debounced]);

  useEffect(() => {
    if (pathname !== "/search") {
      setQuery("");
    }
  }, [pathname]);

  // console.log(debounced)
  return (
    <div>
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
            className="ml-2 text-muted-foreground cursor-pointer"
            onMouseDown={() =>
              router.push(`/search?q=${encodeURIComponent(debounced)}`)
            }
          />

          <Input type="search"
            placeholder="Search songs, artists, scriptures..."
            className=" border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-2 "
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          {query && (
            <X size={20} className=" mr-2 text-2xl text-foreground cursor-pointer" onClick={() => setQuery("")} />
          )}

        </div>
      </div>
    </div>
  );
}
