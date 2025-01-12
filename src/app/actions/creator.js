"use server";

import prisma from "../lib/prisma";

export async function creatorServerAction() {
  try {
    return await prisma.songArtist.findMany({});
  } catch (error) {
    console.log(error, "error from artist server action");
    throw new Error("Failed to fetch songs for the artist.");
  }
}
