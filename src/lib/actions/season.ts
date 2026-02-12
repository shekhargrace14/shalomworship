

import prisma from "../db";

export async function season(){
    try{
        return await prisma.season.findMany(
            {
                include:{
                    song:true,
                    // artist: true,
                }
            }
        )
    }catch (error){
        console.error("Error from season server action:", error);
        throw new Error("Failed to fetch artist")
    }
}