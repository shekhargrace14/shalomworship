"use server"

import prisma from "../../lib/prisma"

export async function artistServerAction() {
    try{
        return await prisma.artist.findMany({})
    }catch(error){
        console.log(error,"error from artist server action")
    }
}