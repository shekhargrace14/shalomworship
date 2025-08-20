"use server";

import prisma from "../db";

export async function songById(id:string) {
  try {
    const song =  prisma.song.findUnique({
      where: { id : id },
      include: {
        author: true,
        creator: true,
        artist: {
          include: {
            artist: {
              select: {
        id: true,
        title: true,
        slug: true,
        image: true,
        type: true, // ✅ Add this to get the artist classification
        link: true,
        color: true,
        createdAt: true,
        updatedAt: true,
      }
            }
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
