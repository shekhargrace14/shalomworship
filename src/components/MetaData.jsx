import { fetchSongBySlug } from "@/app/reactQuery/query";

export async function MetaData({ params }) {
  const slug = await params.id;
  // console.log(params.id, "params  generateMetadata");
//   const song = await fetchSongData(id);
  const song = await fetchSongBySlug(slug);

//   console.log(song, "song  generateMetadata");

  if (!song) {
    return {
      title: "Song Not Found",
      description: "The requested song could not be found.",
    };
  }
  const Keywords = song?.keyword?.join(", ") || "";

  return {
    title: song.title + " " + "lyrics" || "Untitled Song",
    description: song.metaDescription || "No description available",
    keywords: Keywords, // Reuse the 'keywords' variable
    robots:
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    alternates: {
      canonical: `https://www.shalomworship.com/song/${encodeURIComponent(
        song?.slug
      )}`,
    },
    openGraph: {
      title: song.title + " lyrics" || "Untitled Song",
      description: song.metaDescription || "No description available",
      url: `https://www.shalomworship.com/song/${encodeURIComponent(
        song?.slug
      )}`,
      images: [{ url: song.image || "/default-image.jpg" }],
    },
  };
}