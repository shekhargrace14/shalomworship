"use server"

import prisma from "../lib/prisma"

export  async function songServerAction(){
    try{
        return await prisma.song.findMany()
    }catch(error){
        console.error("Error in songServerAction ",error)
        return []

    }
}