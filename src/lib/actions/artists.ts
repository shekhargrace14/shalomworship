"use server";

import prisma from "../db";

export async function artists() {
  try {
    return await prisma.artist.findMany({});
  } catch (error) {
    console.error("Error from artist server action:", error);
    throw new Error("Failed to fetch artists"); // properly throw
  }
}
