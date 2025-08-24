"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { useGetArtists, useGetCategory, useGetSongs } from "@/lib/query/query";

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
      image: song.image,
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
    }));

  return [...songResults, ...artistResults, ...categoryResults];
};

const Search = ({ searchInput }: { searchInput: string }) => {
  const { data: songs } = useGetSongs();
  const { data: artists } = useGetArtists();
  const { data: categories } = useGetCategory();

  const results = filterAll(searchInput, songs, artists, categories);

  return (
    <>
      {searchInput.trim() ? (
        <section className="mt-4 h-[90vh] overflow-y-auto custom-scrollbar bg-[#121212]">
          {results.length > 0 ? (
            results.map(item => (
              <Link
                href={`/${item.type}/${slugify(item.title, { lower: true })}-${item.id}`}
                key={item.type + item.id}
              >
                <div className="bg-[#121212] rounded-lg hover:bg-[#3b3b3b] gap-2">
                  <div className="lg:container mx-auto p-2 flex gap-4 text-white ">
                    <div className="bg-gray-300 flex items-center w-4/12 rounded overflow-hidden sm:lg-0 md:mb-0 ">
                    {!item.image ? "" :
                      <Image
                        src={item.image || '/default-song-image.jpg'}
                        alt={item.title || "Image"}
                        width={700}
                        className="bg-gray-800 object-cover h-full"
                        height={100}
                      />
                      }
                    </div>
                    <div className="w-6/12 grid">
                      <h2 className="line-clamp-1 text-lg md:text-2xl font-semibold">
                        {item.title}
                      </h2>
                      <span className="text-xs text-gray-400">{item.type}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="rounded min-w-full px-4 py-2 text-white bg-red-500 ">
              <p className="text-white text-center">No results found. </p>
            </div>
          )}
        </section>
      ) : null}
    </>
  );
};

export default Search;