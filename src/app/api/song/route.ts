import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("shalomworship"); // replace with your db name
    const collection = db.collection("song"); // replace with your collection

    const data = await collection.find({}).toArray();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
