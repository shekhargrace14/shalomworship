export const dynamic = "force-static";

import { CONTENT_VISIBILITY } from "@/lib/contentVisibility";
import { getAllArtists, getAllArtistsBasic, getAllCategoriesBasic, getAllSongsBasic } from "@/lib/static";
export default async function generateSitemap() {
  const baseUrl = process.env.BASE_URL || "https://www.shalomworship.com";

  try {
    const posts = await getAllSongsBasic([...CONTENT_VISIBILITY.public]);
    const artists = await getAllArtistsBasic();
    const categories = await getAllCategoriesBasic();
    

    const postsUrls =
      posts?.map((post) => ({
        url: `${baseUrl}/song/${post.slug}-${post.id}`,
        lastModified: post.updatedAt || new Date().toISOString(),
      })) ?? [];

    const artistsUrls =
      artists?.map((artist) => ({
        url: `${baseUrl}/artist/${artist.slug}-${artist.id}`,
        lastModified: artist.updatedAt || new Date().toISOString(),
      })) ?? [];

      const categoriesUrls =
      categories?.map((category) => ({
        url: `${baseUrl}/category/${category.slug}`,
        lastModified: category.updatedAt || new Date().toISOString(),
      })) ?? [];

    return [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
      },
      ...postsUrls,
      ...artistsUrls,
      ...categoriesUrls,
    ];
  } catch (error:any) {
    console.error("Error generating sitemap:", error instanceof Error ? error.message : 'Unknown error', error instanceof Error ? error.stack : '');

    return [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
      },
    ];
  }
}
