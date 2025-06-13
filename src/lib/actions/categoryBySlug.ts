"use server"

import prisma from "../db"

export async function categoryBySlug(categorySlug:string) {
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