"use server"

import prisma from "../lib/prisma"

export  async function songServerAction(){
    try{
        const song = await prisma.song.findMany()
    
        return song
    }catch(error){
        console.error("Error in songServerAction ",error)
        return []

    }
}