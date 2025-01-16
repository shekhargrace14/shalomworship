"use server"

import prisma from "../lib/prisma"

export async function category() {
    try{
        return await prisma.category.findMany({
            include: {
                song: true, // Fetch all songs related to the artist
              },
        })
    }catch(error){
        console.log(error,"error from artist server action")
    }
}