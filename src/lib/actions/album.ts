
import prisma from "../db";

export async function album(){
    try{
        return await prisma.album.findMany(
            {
                include:{
                    song:true,
                    artist:true,
                }
            }
        )
    }catch (error){
        console.error("Error from album server action:", error);
        throw new Error("Failed to fetch album")
    }
}