// components/JsonLdScript.tsx
import { fetchSongById } from "@/lib/query/query";

export default async function JsonLd({ id }: { id: string }) {
  const songData = await fetchSongById(id);
  
  if (!songData) return null;

  const artistNames = songData.artist.map(artistObj => artistObj.artist.title);
  
  // Build the base JSON-LD data
  const jsonLdData: any = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    "@id": `https://www.shalomworship.com/song/${songData.slug}-${songData.id}`,
    "name": songData.title,
    "description": `Lyrics for "${songData.title}" by ${artistNames.join(', ')}`,
    "genre": "gospel",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.shalomworship.com/song/${songData.slug}-${songData.id}`
    },
    "image": songData.image
  };

  // Add artists
  if (artistNames.length === 1) {
    jsonLdData.byArtist = {
      "@type": "MusicGroup",
      "name": artistNames[0]
    };
  } else if (artistNames.length > 1) {
    jsonLdData.creator = artistNames.map(artistName => ({
      "@type": "MusicGroup",
      "name": artistName
    }));
  }



  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}