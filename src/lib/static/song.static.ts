import { albumFullSelect, artistFullSelect, categoryBasicSelect, categoryFullSelect, songBaseSelect, songContentSelect, songFullSelect, songMediaSelect } from "@/prisma/selectors";
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
                        isCreator: true,
                        isArtist: true,
                        artist: {
                            select: artistFullSelect
                        }
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

export async function getAllSongsBasic(statuses: StatusType[]) {
    return prisma.song.findMany({
        where: { status: { in: statuses } },
        select: songBaseSelect
    });
}

export async function getAllSongsDisplay(statuses: StatusType[]) {
    return prisma.song.findMany({
        where: { status: { in: statuses } },
        select: songBaseSelect
    });
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
                        select: categoryBasicSelect
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
export async function getSongDisplay(
    id: string,
    statuses: StatusType[]
) {
    return prisma.song.findUnique({
        where: { id: id, status: { in: statuses } },
        select: {
            author: true,
            creator: true,
            ...songBaseSelect,
            ...songMediaSelect
        }
    });
}