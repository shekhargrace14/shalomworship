import { NextResponse } from "next/server";
import { fetchSongs } from "../reactQuery/query";

export async function GET() {
  // Fetch posts data from your API
  const baseUrl = process.env.BASE_URL || "https://www.shalomworship.com";

  const posts = await fetchSongs();
//   const item = posts.map((song)=>{
//     return song
    
//   })
//   const artists = [];
//   const creators = [];
//   item.artist.forEach((item) => {
//     if (item.isCreator) {
//       creators.push(item.artist);
//     } else {
//       artists.push(item.artist);
//     }
//   });


  // Generate RSS XML
  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Shalom Worship</title>
    <link>https://www.shalomworship.com</link>
    <description>Shalom Worship is a faith-based music ministry dedicated to spreading the message of peace, hope, and salvation through heartfelt worship. Known for its soul-stirring melodies and spirit-filled lyrics, Shalom Worship brings together a community of believers to praise and glorify God.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${post.title} </title>
      <link>${baseUrl}/song/${post.slug}</link>
      <description>${post.metaDescription}</description>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <guid>${baseUrl}/song/${post.slug}</guid>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  // Return RSS feed as a response
  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
}
