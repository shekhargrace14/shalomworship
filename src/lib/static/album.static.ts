import { albumFullSelect, albumMiniSelect, artistFullSelect } from "@/prisma/selectors";
import prisma from "./prisma";

export async function getAllAlbums() {
    try {
        return await prisma.album.findMany(
            {
                select: {
                    ...albumFullSelect,
                    artist: {
                        select: {
                            artist: {
                                select: artistFullSelect
                            }
                        },
                    },

                }
            }
        )
    } catch (error) {
        console.error("Error from album server action:", error);
        throw new Error("Failed to fetch album")
    }
}

export async function getAlbum(id: string) {
    try {
    return await prisma.album.findUnique({
      where: { id: id },
      include: {
                song: {
                    include: {
                        song: true, // This gives you the song details
                    }
                },
                artist: {
                    include: {
                        artist: true, // This gives you the artist details
                    }
                }
            }

    })
  } catch (error) {
    console.error("Error from albumById server action:", error)
    throw new Error("Failed to fetch album by ID")
  }
}