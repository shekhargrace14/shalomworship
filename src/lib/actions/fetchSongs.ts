

import { StatusType } from "@prisma/client";
import prisma from "../db";

export  async function fetchSongs(
  statuses: StatusType[]
){
    try{
        return await prisma.song.findMany({
            where : {
              status:{in: statuses }
            },
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