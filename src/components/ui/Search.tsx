"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { useGetArtists, useGetCategory, useGetSongs } from "@/lib/query/query";
import { Input } from "./input";

export type Song = {
  id: string;
  title: string;
  content: string;
  image: string | null;
  author?: { id: string; image: string; title: string } | null;
  creator?: { id: string; image: string | null; title: string } | null;
};

type SearchResult = {
  type: "song" | "artist" | "category";
  id: string;
  title: string;
  image: string | null;
  // color:string |null;
};

const filterAll = (
  searchInput: string,
  songs: Song[] = [],
  artists: any[] = [],
  categories: any[] = []
): SearchResult[] => {
  if (!searchInput.trim()) return [];
  const lower = searchInput.toLowerCase();

  const songResults: SearchResult[] = songs
    ?.filter(song => song.title.toLowerCase().includes(lower))
    .map(song => ({
      type: "song" as const,
      id: song.id,
      title: song.title,
      image: song.image
    }));

  const artistResults: SearchResult[] = artists
    ?.filter(artist => artist.title.toLowerCase().includes(lower))
    .map(artist => ({
      type: "artist" as const,
      id: artist.id,
      title: artist.title,
      image: artist.image,
    }));

  const categoryResults: SearchResult[] = categories
    ?.filter(category => category.title.toLowerCase().includes(lower))
    .map(category => ({
      type: "category" as const,
      id: category.id,
      title: category.title,
      image: category.image,
      // color:category.color,
    }));
    return [...songResults, ...artistResults, ...categoryResults];
  };
  
  const Search = ({ searchInput }: { searchInput: string }) => {
    const { data: songs } = useGetSongs();
    const { data: artists } = useGetArtists();
    const { data: categories } = useGetCategory();
    // console.log(songs[2]?.color)
    // console.log(artists[2]?.color)
    // console.log(categories[2]?.color)

  const results = filterAll(searchInput, songs, artists, categories);

  return (
    <>
      {searchInput?.trim() ? (
        <section className="bg-card rounded-md max-h-[86vh] overflow-y-auto custom-scrollbar ">
          {results.length > 0 ? (
            results.map(item => (
              <Link
                href={
                  item.type === "category"
                    ? `/category/${slugify(item.title, { lower: true })}`
                    : `/${item.type}/${slugify(item.title, { lower: true })}-${item.id}`
                }
                key={item.type + item.id}
              >
                <div className="bg-card gap-2">
                  <div className="lg:container mx-auto p-2 flex gap-4 text-foreground">
                    <div className=" flex items-center justify-center w-4/12 md:w-3/12 rounded overflow-hidden sm:lg-0 md:mb-0 ">
                    {/* {!item.image ? {item?.color} : */}
                      {!item.image ? "":
                        <Image
                          src={item.image || '/default-song-image.jpg'}
                          alt={item.title || "Image"}
                          width={500}
                          className="w-fit h-fit md:h-20 bg-gray-800 object-cover "
                          height={100}
                        />
                      }
                    </div>
                    <div className="w-6/12 flex flex-col justify-center ">
                        <h2 className="line-clamp-1 text-foreground text-base md:text-base font-medium">
                        {item.title}
                      </h2>
                      <span className="text-xs text-foreground">{item.type}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="rounded min-w-full px-4 py-2 text-foreground bg-destructive ">
              <p className="text-foreground text-center">No results found. </p>
            </div>
          )}
        </section>
      ) : null}
    </>
  );
};

export default Search;