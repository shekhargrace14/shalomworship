import { connectionStr } from "@/lib/db";
import { Song } from "@/lib/model/songs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(_, { params }) {
  try {
    await mongoose.connect(connectionStr);
    const data = await Song.findById(params.id);

    if (!data) {
      return NextResponse.json({
        result: null,
        success: false,
        error: "Song not found",
      });
    }
    mongoose.disconnect();

    return NextResponse.json({
      result: data,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      result: null,
      success: false,
      error: "Failed to fetch song data",
    });
  }
}
