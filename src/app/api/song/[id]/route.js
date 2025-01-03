import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request,context) {
  try {
    // Extracting the song ID from the request URL
    const url = new URL(request.url);
    // const songId = url.searchParams.get("id");
    const songId = context.params.id
    // const songurl = "http://localhost:3000";
    const songurl = "https://www.shalomworship.com";
    const response = await fetch(`${songurl}/api/song`);
    const jsonData = await response.json();
    

    const songData = jsonData.result;
  
    const firstItemId = songData[0]?._id; 

    // Find the song by ID
    const song = songData.find((item) => item.seo.slug == songId);
    // console.log(song,"-----------------------------",songId )9
    if (!song) {
      return NextResponse.json({
        result: null,
        success: false,
        error: "Song not found",
      });
    }

    // console.log(song, "Filtered song");

    return NextResponse.json({
      result: song,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching song data:", error);

    return NextResponse.json({
      result: null,
      success: false,
      error: "Failed to fetch song data",
    });
  }
}
