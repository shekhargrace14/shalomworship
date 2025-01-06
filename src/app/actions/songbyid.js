"use server"

import prisma from "../lib/prisma"

export  async function songbyidServerAction(id){
    try{
        return await prisma.song.findUnique({
            where:{id:id }
        });
    
    }catch(error){
        console.error("Error in songServerAction ",error)
        return []

    }
}