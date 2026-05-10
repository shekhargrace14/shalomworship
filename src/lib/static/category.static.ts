import { StatusType } from "@prisma/client";
import prisma from "./prisma";
import { categoryBasicSelect } from "@/prisma/selectors";


export async function getAllCategories() {
  try {
    return await prisma.category.findMany({
      include: {
        song: true, // Fetch all songs related to the artist
      },
    })
  } catch (error) {
    console.log(error, "error from category server action")
  }
}

export async function getAllCategoriesBasic() {
  try {
    return await prisma.category.findMany({
      select: categoryBasicSelect
    })
  } catch (error) {
    console.log(error, "error from category server action")
  }
}


export async function getCategory(
  categorySlug: string,
  statuses: StatusType[]
) {
  return prisma.category.findUnique({
    where: { slug: categorySlug },
    include: {
      song: {
        where: {
          song: {
            status: { in: statuses },
          },
        },
        select: {
          song: {
            select: {
              id: true, // ✅ only id
            },
          },
        },
      },
    },
  });
}
