import { StatusType } from "@prisma/client";
import prisma from "./prisma";
import { artistBaseSelect, artistFullSelect } from "@/prisma/selectors";

export async function getAllArtists() {
  try {
    return await prisma.artist.findMany({});
  } catch (error) {
    console.error("Error from artist server action:", error);
    throw new Error("Failed to fetch artists"); // properly throw
  }
}
export async function getAllArtistsBasic() {
  try {
    return await prisma.artist.findMany({
      select: artistBaseSelect
    });
  } catch (error) {
    console.error("Error from artist server action:", error);
    throw new Error("Failed to fetch artists"); // properly throw
  }
}
export async function getArtist(
  artistId: string,
  statuses: StatusType[]
) {
  try {

    return prisma.artist.findUnique({
      where: { id: artistId },
      select: {
        ...artistFullSelect,
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
  } catch (error) {
    console.log("issue with query at aritst.static.ts")
  }
}