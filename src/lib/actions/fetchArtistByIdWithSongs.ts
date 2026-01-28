import { StatusType } from "@prisma/client";
import prisma from "../db";

export async function fetchArtistByIdWithSongs(
  artistId: string,
  statuses: StatusType[]
) {
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
}
