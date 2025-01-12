"use server";

import prisma from "../lib/prisma";

export async function creatorByIdServerAction(id) {
  try {
    return await prisma.songArtist.findMany({
      where: {
        artistId: id // Use artistId to filter by the artist's ID
      },
      include: {
        song: true, // Fetch all songs related to the artist
      },
    });
  } catch (error) {
    console.log(error, "error from artist server action");
    throw new Error("Failed to fetch songs for the artist.");
  }
}
