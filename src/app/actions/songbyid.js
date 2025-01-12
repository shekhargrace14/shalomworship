"use server";

import prisma from "../lib/prisma";

export async function songbyidServerAction(id) {
  try {
    const song =  prisma.song.findUnique({
      where: { id : id },
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
