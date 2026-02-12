
import prisma from "../db"

export async function category() {
    try{
        return await prisma.category.findMany({
            include: {
                song: true, // Fetch all songs related to the artist
              },
        })
    }catch(error){
        console.log(error,"error from category server action")
    }
}