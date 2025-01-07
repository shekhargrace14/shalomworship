// import { fetchSongs } from "@/app/reactQuery/query";

import { songServerAction } from "./actions/song";
import { fetchSongs } from "./reactQuery/query";

export default async function generateSitemap() {
  const baseUrl = process.env.BASE_URL || "https://www.shalomworship.com";

  try {
    const posts = await fetchSongs();

    const postsUrls =
      posts?.map((post) => ({
        url: `${baseUrl}/song/${post.slug}`,
        lastModified: post.lastModified || new Date().toISOString(),
      })) ?? [];

    return [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
      },
      ...postsUrls,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error.message, error.stack);

    return [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
      },
    ];
  }
}
