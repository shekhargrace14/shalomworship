import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request,context) {
  try {
    // Extracting the song ID from the request URL
    const url = new URL(request.url);
    // const songId = url.searchParams.get("id");
    const songId = context.params.id
    // console.log(songId,"ksjfkjsdkfjaskdfjkasjf")

    // if (!songId) {
    //   return NextResponse.json({
    //     result: null,
    //     success: false,
    //     error: "Song ID is required",
    //   });
    // }

    // Fetch the song data
    const songurl = "http://localhost:3000";
    // const url = "https://www.shalomworship.com";
    const response = await fetch(`${songurl}/api/song`);
    const jsonData = await response.json();
    
    // Access the `result` key, if it exists
    const songData = jsonData.result;
    
    // console.log(Array.isArray(songData), songData, "Song Data");
    // console.log(songData[2].id, "Song Data");
    const firstItemId = songData[0]?._id; // Use optional chaining to avoid errors
// console.log("First Item ID:", firstItemId);

    // Find the song by ID
    const song = songData.find((item) => item.seo.slug == songId);
    // console.log(song,"-----------------------------",songId )
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
