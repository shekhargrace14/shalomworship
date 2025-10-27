"use server"

import prisma from "../db"

export async function albumById(id: string) {
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
