// components/JsonLdScript.tsx
import { fetchSongById } from "@/lib/query/query";
import LanguageName from "./LanguageName";
import { getLanguageName } from "@/utils/getLanguageName";

export default async function JsonLd({ id }: { id: string }) {
  const songData = await fetchSongById(id);
  if (!songData) return null;

  const artistNames = songData.artist.map(a => a.artist.title);
  const primaryArtist = artistNames[0] || "Unknown Artist";

  const lang = songData.language ?? "en";
  const langName = getLanguageName(lang);


  // Safely extract first 250 chars of lyrics in the correct language
  function getLyricSnippet(songData: any, lang: string) {
    if (!Array.isArray(songData.lines)) return "";

    for (const section of songData.lines) {
      if (!Array.isArray(section)) continue;

      for (const line of section) {
        const lyric = line?.lyrics?.[lang];

        // if lyric exists and is a non-empty string
        if (typeof lyric === "string" && lyric.trim().length > 0) {
          return lyric.slice(0, 250).trim();
        }
      }
    }

    return ""; // fallback
  }
  const lyricSnippet =
    getLyricSnippet(songData, lang) ||
    getLyricSnippet(songData, "en") ||
    "";


  // songData.lines?.[0]?.lyrics?.[lang]?.slice(0, 250)?.trim() || "";
  // songData.excerpt || "";

  const jsonLdData: any = {
    "@context": "https://schema.org",
    "@type": "MusicComposition",
    "@id": `https://www.shalomworship.com/song/${songData.slug}-${songData.id}`,

    "name": songData.title,
    "inLanguage": lang,
    "genre": "Gospel",
    "alternateName": `${songData.title} Lyrics in ${langName} `,
    // "description": `${songData.title} lyrics by ${primaryArtist}. Includes chords, meaning, and details.`,
    "description": `${songData.title} ${langName} Christian worship song by ${artistNames[0]}. Read lyrics,${songData.isChords ? " chords," : ""} translation, meaning${songData.isChords ? ", and Nashville Number Chart" : ""}.`,

    // ---- LYRICS PREVIEW (SAFE FOR GOOGLE) ----
    "lyrics": {
      "@type": "CreativeWork",
      "text": lyricSnippet ? lyricSnippet + "..." : undefined
    },

    // ---- ARTIST / CREATOR ----
    "lyricist": {
      "@type": "Person",
      "name": primaryArtist
    },
    "composer": {
      "@type": "Person",
      "name": primaryArtist
    },
    ...(artistNames.length === 1
      ? {
        byArtist: {
          "@type": "MusicGroup",
          "name": primaryArtist
        }
      }
      : {
        creator: artistNames.map(name => ({
          "@type": "MusicGroup",
          "name": name
        }))
      }),

    "about": [
      ...artistNames.map(n => ({
        "@type": "MusicGroup",
        "name": n
      })),
      {
        "@type": "MusicGenre",
        "name": "Gospel"
      },
      {
        "@type": "Thing",
        "name": `${langName} Christian Worship`
      }
    ],



    // ---- COVER IMAGE ----
    "image": {
      "@type": "ImageObject",
      "url": songData.image,
      "width": 1200,
      "height": 630
    },
    "thumbnailUrl": songData.image,

    "workExample": {
      "@type": "MusicRecording",
      "url": `https://www.youtube.com/watch?v=${songData.videoId}`
    },

    "datePublished": songData.createdAt,


    // --- CATEGORY ------

    "isPartOf": {
      "@type": "MusicPlaylist",
      "name": songData.category?.[0]?.category?.title || "",
      "url": `https://www.shalomworship.com/category/${songData.category?.[0]?.category?.slug}`
    },


    // ---- RECORDING INFO (YouTube) ----
    ...(songData.videoId
      ? {
        recordedAs: {
          "@type": "MusicRecording",
          "name": `${songData.title} (Audio)`,
          "url": `https://www.youtube.com/watch?v=${songData.videoId}`,
          "inLanguage": lang
        }
      }
      : {}),

    // ---- ALBUM (if exists) ----
    ...(songData.album?.length
      ? {
        inAlbum: {
          "@type": "MusicAlbum",
          "name": songData.album[0].album.title,
          "url": `https://www.shalomworship.com/album/${songData.album[0].album.slug}-${songData.album[0].album.id}`,
          "image": {
            "@type": "ImageObject",
            "url": songData.album[0].album.image
          }
        }
      }
      : {}),

    // ---- MAIN PAGE ----
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.shalomworship.com/song/${songData.slug}-${songData.id}`
    },

    // ---- BREADCRUMB ----
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Songs",
          "item": "https://www.shalomworship.com/song"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": songData.title,
          "item": `https://www.shalomworship.com/song/${songData.slug}-${songData.id}`
        }
      ]
    },

    "keywords": songData.keyword?.join(", ") || undefined,


    // ---- PUBLISHER INFO ----
    "publisher": {
      "@type": "Organization",
      "name": "Shalom Worship",
      "url": "https://www.shalomworship.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.shalomworship.com/logo.png"
      }
    }

    // future section 
    // 1. Add sameAs (External links)
    // Helps Google connect the artist or page with trusted sources.
    // If the artist has Instagram / Spotify, add those too.

    // "sameAs": [
      // "https://www.youtube.com/watch?v=1MDS1VQnTcc"
    // ]

    // 2. Add teaches (for meaning pages)
    // Google uses this for educational content:
    // "teaches": "Meaning and interpretation of the Christian worship song Shukrguzar"

    // 3. Add version for freshness
    // "version": "1.0"

    // 4. Add duration for music recording (if known)
    // "duration": "PT4M12S"
    // This strengthens MusicRecording schema.




  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
