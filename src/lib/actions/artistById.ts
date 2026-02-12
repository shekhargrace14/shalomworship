
import prisma from "../db"

export async function artistById(id:string) {
    try{
        return await prisma.artist.findMany({
            where:{
                id: id
            },
            include: {
              song: true, // Fetch all songs related to the artist
            //   season:true,
            },
        })
    }catch(error){
        console.log(error,"error from artist server action")
    }
}