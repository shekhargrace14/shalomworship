import { StatusType } from "@prisma/client";
import prisma from "../db";

export async function fetchCategoryBySlugWithSongs(
  categorySlug: string,
  statuses: StatusType[]
) {
  return prisma.category.findMany({
    where: { slug: categorySlug }, 
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
