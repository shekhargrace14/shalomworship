"use server"

import prisma from "../lib/prisma"

export async function artistByIdServerAction(id) {
    try{
        return await prisma.artist.findMany({
            where:{
                id:id
            },
            include: {
              song: true, // Fetch all songs related to the artist
            },
        })
    }catch(error){
        console.log(error,"error from artist server action")
    }
}