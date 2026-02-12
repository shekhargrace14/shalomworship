
import prisma from "../db";

export  async function songs(){
    try{
        return await prisma.song.findMany({
            include: {
              author: true,
              creator: true,
              artist: {
                include: {
                  artist: true,
                },
              },
              genre: {
                include: {
                  genre: true,
                },
              },
              category: {
                include: {
                  category: true,
                },
              },
            },
          });
    }catch(error){
        console.log("Error in songServerAction ",error)
        return []

    }
}