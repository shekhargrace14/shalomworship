"use server"

import prisma from "../../lib/prisma"

export  async function songServerAction(){
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