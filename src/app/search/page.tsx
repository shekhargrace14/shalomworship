"use client";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce"; // optional custom hook
import { useGetSongs, useGetArtists, useGetCategory } from "@/lib/query/query";
import { ArtistProps, Category, CategoryType, Song, SongType } from "@/types";
import { ArtistType } from "@prisma/client";

import { useSearchParams } from "next/navigation";
import Section from "@/components/searchComp/Section";
import Menu from "@/components/layout/Menu";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    console.log(query)


    const debouncedSearch = useDebounce(query, 300);

    const { data: songData } = useGetSongs();
    const { data: artistData } = useGetArtists();
    const { data: categoryData } = useGetCategory();

    const [filteredSongs, setFilteredSongs] = useState<SongType[]>([]);
    const [filteredArtists, setFilteredArtists] = useState<ArtistProps[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        // if (!debouncedSearch) {
        //     setFilteredSongs([]);
        //     setFilteredArtists([]);
        //     setFilteredCategories([]);
        //     return;
        // }

        setFilteredSongs(
            songData?.filter(song =>
                song.title.toLowerCase().includes((query ?? "").toLowerCase())    
                ||
                song.content.toLowerCase().includes((query ?? "").toLowerCase())    
            ) || []
        );

        setFilteredArtists(
            artistData?.filter(artist =>
                artist.name.toLowerCase().includes((query ?? "").toLowerCase())
            ) || []
        );

        setFilteredCategories(
            categoryData?.filter(category =>
                category.name.toLowerCase().includes((query ?? "").toLowerCase())
            ) || []
        );
    }, [query, songData, artistData, categoryData]);

    return (
    <div className=' h-[90vh] overflow-y-auto custom-scrollbar p-4'>

          <Menu />
        <div className=" grid grid-cols-1 md:grid-cols-2">

            <div>

            <p className="h3">Top result</p>

            {debouncedSearch && (   
                <>
                    <Section title="Songs" data={filteredSongs} />
                    {/* <Section title="Artists" data={filteredArtists} />   */}
                    {/* <Section title="Categories" data={filteredCategories} /> */}

                </>
            )}
            </div>
            <div>
                
            </div>

        </div>
        </div>
    );
}