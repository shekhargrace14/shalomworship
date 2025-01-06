"use server"

import prisma from "../lib/prisma"

export  async function songbyidServerAction(id){
    try{
        const songbyid = await prisma.song.findUnique({
            where:{id:id }
        });
    
        return songbyid
    }catch(error){
        console.error("Error in songServerAction ",error)
        return []

    }
}