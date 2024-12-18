import { connectionStr } from "@/app/lib/db";
import { Song } from "@/app/lib/model/songs";

import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    let data = [];
    try{ 
        await mongoose.connect(connectionStr)
        data = await Song.find()
    }catch{
        data={success:false}
    }
    return NextResponse.json({result:data})
}