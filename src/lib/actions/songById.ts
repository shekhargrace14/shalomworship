// new songById


import { artistFullSelect, songFullSelect, albumFullSelect, categoryFullSelect } from "@/prisma/selectors";
import prisma from "../db";

export async function songById(id: string) {
  try {
    const song = prisma.song.findUnique({
      where: { id: id },
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
              select : categoryFullSelect
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

    if (!song) {
      console.warn(`Song with slug "" not found.`);
      return null;
    }

    return song;
  } catch (error) {
    console.error("Error in songBySlugServerAction:", error);
    return null;
  }
}

