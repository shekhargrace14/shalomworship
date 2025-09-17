"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { useGetArtists, useGetCategory, useGetSongs } from "@/lib/query/query";
import { Input } from "./input";
import { Search } from "lucide-react";

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
  
  const SearchCopy = () => {
  // const SearchCopy = ({ searchInput }: { searchInput: string }) => {
    // const { data: songs } = useGetSongs();
    // const { data: artists } = useGetArtists();
    // const { data: categories } = useGetCategory();
    // console.log(songs[2]?.color)
    // console.log(artists[2]?.color)
    // console.log(categories[2]?.color)

  // const results = filterAll(searchInput, songs, artists, categories);

  return (
    <>
      <div className="relative w-full max-w-sm">
      {/* Search Icon */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

      {/* Input Field */}
      <Input
        type="search"
        placeholder="Search..."
        className="pl-9" // adds padding so text doesn’t overlap the icon
      />
    </div>
    </>
  );
};

export default SearchCopy;