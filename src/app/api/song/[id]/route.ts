import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ✅ await because it's a Promise in Next 15

    const client = await clientPromise;
    const db = client.db("shalomworship");
    const collection = db.collection("song");

    const song = await collection.findOne({ _id: new ObjectId(id) });

    if (!song) {
      return NextResponse.json(
        { success: false, message: "Song not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: song });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
