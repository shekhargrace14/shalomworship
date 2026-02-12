import prisma from "./prisma";


export async function getAllCategories() {
    try{
        return await prisma.category.findMany({
            include: {
                song: true, // Fetch all songs related to the artist
              },
        })
    }catch(error){
        console.log(error,"error from category server action")
    }
}

// export async function getCategoryForStaticPage(slug: string) {
//   return prisma.category.findUnique({
//     where: { slug },
//     select: {
//       title: true,
//       slug: true,
//       song: {
//         select: {
//           songId: true,
//           title: true,
//           slug: true,
//         },
//       },
//     },
//   });
// }