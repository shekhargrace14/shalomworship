import { fetchSongs } from "@/app/reactQuery/query";

export async function generateSitemap() {
  const baseUrl = "https://www.shalomworship.com";

  try {
    const posts = await fetchSongs();
    const postsUrls =
      posts.result?.map((post) => ({
        url: `${baseUrl}/song/${post._id}`,
        lastModified: new Date().toISOString(),
      })) ?? [];

    return [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
      },
      ...postsUrls,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
      },
    ];
  }
}
