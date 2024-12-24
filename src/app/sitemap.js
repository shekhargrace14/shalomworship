import { fetchSongs } from "@/app/reactQuery/query";

export default async function generateSitemap() {
  const baseUrl = "https://www.shalomworship.com";
  // const baseUrl = "http://localhost:3000";


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
