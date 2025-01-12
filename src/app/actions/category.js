"use server"

import prisma from "../lib/prisma"

export async function categorySeverAction() {
    try{
        return await prisma.category.findMany({})
    }catch(error){
        console.log(error)
    }
}