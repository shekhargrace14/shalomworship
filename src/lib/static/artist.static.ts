import { StatusType } from "@prisma/client";
import prisma from "./prisma";

export async function getAllArtists() {
  try {
    return await prisma.artist.findMany({});
  } catch (error) {
    console.error("Error from artist server action:", error);
    throw new Error("Failed to fetch artists"); // properly throw
  }
}

export async function getArtist(
  artistId: string,
  statuses: StatusType[]
) {
  try{

    return prisma.artist.findUnique({
      where: { id: artistId },
      include: {
        song: {
          where: {
            song: {
              status: { in: statuses },
            },
          },
          include: {
            song: true, // <-- THIS gives you full song data
          },
        },
      },
    })
  }catch(error){
    console.log("issue with query at aritst.static.ts")
  }
}