import { connectionStr } from "@/app/lib/db";
import { Song } from "@/app/lib/model/songs";
import prisma from "@/app/lib/prisma";

import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    let data = [];
    try{ 
        // await mongoose.connect(connectionStr)
        // data = await prisma.song.findMany()
        data = await prisma.song.findMany({
            include: {
              artist: { // Include the SongArtist relation
                include: {
                  artist: true, // Include the details of the related artist
                },
              },
              genre: { // Include the SongGenre relation
                include: {
                  genre: true, // Include the details of the related genre
                },
              },
            },
          });
          
    }catch{
        data={success:false}
    }
    return NextResponse.json({result:data})
}