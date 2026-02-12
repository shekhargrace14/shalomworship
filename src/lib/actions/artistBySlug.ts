
import prisma from "../db"

export async function artistBySlug(id:string) {
    try{
        return await prisma.artist.findMany({
            where:{
                id: id
            },
            include: {
              song: true, // Fetch all songs related to the artist
                album: true, // Fetch all albums related to the artist
            },
        })
    }catch(error){
        console.log(error,"error from artist server action")
    }
}