import { albumFullSelect, artistFullSelect, categoryFullSelect, songFullSelect } from "@/prisma/selectors";
import prisma from "./prisma";
import { StatusType } from "@prisma/client";

const SONG_LIST_CACHE = new Map<string, any[]>();

function statusKey(statuses: StatusType[]) {
    return statuses.sort().join(",");
}

export async function getAllSongs(statuses: StatusType[]) {

    const key = statusKey(statuses);

    if (SONG_LIST_CACHE.has(key)) {
        return SONG_LIST_CACHE.get(key)!;
    }

    try {
        const songs = await prisma.song.findMany({
            where: {
                status: { in: statuses }
            },
            select: {

                author: true,
                creator: true,
                ...songFullSelect,
                artist: {
                    select: {
                        artist: true,
                    },
                },

                category: {
                    select: {
                        category: true,
                    },
                },
            },
        });
        SONG_LIST_CACHE.set(key, songs);
        return songs;
    } catch (error) {
        console.log("Error in songServerAction ", error)
        return []

    }

}

/**
 * Full song – used ONLY by /song/[slugAndId]
 */
export async function getSong(
    id: string,
    statuses: StatusType[]
) {
    return prisma.song.findUnique({
        where: { id: id, status: { in: statuses } },
        select: {
            author: true,
            creator: true,
            ...songFullSelect,

            artist: {
                select: {
                    isCreator: true,
                    isArtist: true,
                    artist: {
                        select: artistFullSelect
                    }
                },
            },
            genre: {
                select: {
                    genre: true,
                },
            },
            category: {
                select: {
                    category: {
                        select: categoryFullSelect
                    }
                },
            },
            album: {
                select: {
                    album: {
                        select: albumFullSelect
                    }
                },
            },
        },
    });
}