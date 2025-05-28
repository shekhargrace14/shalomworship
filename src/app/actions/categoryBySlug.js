"use server"

import prisma from "../../lib/prisma"

export async function categoryBySlug(categorySlug) {
    try{
        return await prisma.category.findMany({
            where:{
                slug: categorySlug
            },
            include: {
              song: true, // Fetch all songs related to the artist
            },
        })
    }catch(error){
        console.log(error,"error from artist server action")
    }
}