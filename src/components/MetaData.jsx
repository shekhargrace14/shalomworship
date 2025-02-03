import { fetchSongBySlug } from "@/app/reactQuery/query";

export async function MetaData({ title, keyword, metaDescription, slug, image }) {
  // Fetch the song data using the provided slug
  // const song = await fetchSongBySlug(slug);

  // console.log(song, "song generateMetadata"); // Log the song data for debugging

  // Handle the case where the song is not found
  if (!title) {
    return {
      title: "Page Not Found",
      description: "The requested song could not be found.",
    };
  }

  // Prepare keywords if they exist
  const Keywords = keyword?.join(", ") || "";

  // Return the metadata object
  return {
    title: title || "Untitled Song",
    description: metaDescription || "No description available",
    keywords: Keywords, // Reuse the 'keywords' variable
    robots:
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    alternates: {
      canonical: `https://www.shalomworship.com/song/${encodeURIComponent(
        slug
      )}`,
    },
    openGraph: {
      title: title + " lyrics" || "Untitled Song",
      description: metaDescription || "No description available",
      url: `https://www.shalomworship.com/song/${encodeURIComponent(
        slug
      )}`,
      images: [{ url: image || "/default-image.jpg" }],
    },
  };
}
