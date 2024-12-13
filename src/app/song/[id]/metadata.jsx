export async function generateMetadata({ params }) {
    const res = await fetch(`https://shalomworship.vercel.app/api/song/${params.id}`);
  
    if (!res.ok) {
      // Handle error: log, return fallback metadata, or throw an error
      console.error(`Failed to fetch metadata: ${res.status} ${res.statusText}`);
      return {
        title: "Song Not Found",
        description: "The song could not be retrieved.",
      };
    }
  
    const song = await res.json();
  
    return {
      title: song.title,
      description: song.excerpt,
      openGraph: {
        title: song.title,
        description: song.excerpt,
        url: `https://www.shalomworship.com/blog/${song.seo.slug}`,
        images: [{ url: song.image }],
      },
    };
  }
  