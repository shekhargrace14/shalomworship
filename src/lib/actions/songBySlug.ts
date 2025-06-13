"use server";

import prisma from "../db";

export async function songBySlug(songSlug:string) {
  try {
    const song =  prisma.song.findUnique({
      where: { slug : songSlug },
      include: {
        author: true,
        creator: true,
        artist: {
          include: {
            artist: true,
          },
        },
        genre: {
          include: {
            genre: true,
          },
        },
        category: {
          include: {
            category: true,
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
