// components/JsonLdScript.tsx
import { fetchSongById } from "@/lib/query/query";
import { getLanguageName } from "@/utils/getLanguageName";

export default async function JsonLd({ id }: { id: string }) {
  const songData = await fetchSongById(id);
  if (!songData) return null;

  // -------- SAFE VALUES --------
  const artistNames = songData.artist?.map(a => a.artist.title) || [];
  const primaryArtist = artistNames[0] || "Unknown Artist";

  const lang = songData.language ?? "en";
  const langName = getLanguageName(lang);
  const key = songData.key;

  const safeImage = songData.image || "https://www.shalomworship.com/default-song.jpg";
  const safeVideoId = songData.videoId || "";
  const safeCategory = songData.category?.[0]?.category;
  const safeAlbum = songData.album?.[0]?.album;

  // -------- LYRICS SNIPPET --------
  function getLyricSnippet(data: any, lang: string): string {
    if (!Array.isArray(data.lines)) return "";

    for (const section of data.lines) {
      if (!Array.isArray(section)) continue;

      for (const line of section) {
        const lyric = line?.lyrics?.[lang];
        if (typeof lyric === "string" && lyric.trim()) {
          return lyric.slice(0, 250).trim();
        }
      }
    }
    return "";
  }

  const lyricSnippet =
    getLyricSnippet(songData, lang) ||
    getLyricSnippet(songData, "en") ||
    "";

  // -------- JSON-LD DATA --------
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "MusicComposition",
    "@id": `https://www.shalomworship.com/song/${songData.slug}-${songData.id}`,
    "identifier": `${songData.slug}-${songData.id}`,

    name: songData.title,
    inLanguage: lang,
    alternateName: `${songData.title} Lyrics in ${langName}`,
    ...(key && { "musicalKey": key }),
    genre: "Gospel",
    iswcCode : "",

    description: `${songData.title} ${langName} Christian worship song by ${primaryArtist}. Read lyrics${songData.isChords ? ", chords and Nashville Numbers Chart" : ""}, translation, and meaning.`,

    lyrics: {
      "@type": "CreativeWork",
      text: lyricSnippet ? `${lyricSnippet}...` : undefined,
    },

    lyricist: { "@type": "Person", name: primaryArtist },
    composer: { "@type": "Person", name: primaryArtist },

    // byArtist: {
    //   "@type": "MusicGroup",
    //   name: primaryArtist,
    // },
    creator: artistNames.map(name => ({
  "@type": "MusicGroup",
  name
})),


    about: [
      ...artistNames.map(n => ({ "@type": "MusicGroup", name: n })),
      { "@type": "Thing", name: `${langName} Christian Worship` },
    ],

    image: {
      "@type": "ImageObject",
      url: safeImage,
      width: 1200,
      height: 630,
    },
    thumbnailUrl: safeImage,

    workExample: safeVideoId
      ? { "@type": "MusicRecording", url: `https://www.youtube.com/watch?v=${safeVideoId}` }
      : undefined,

    recordedAs: safeVideoId
      ? {
          "@type": "MusicRecording",
          name: `${songData.title} (Audio)`,
          url: `https://www.youtube.com/watch?v=${safeVideoId}`,
          inLanguage: lang,
          "identifier": `${safeVideoId}`,
        }
      : undefined,

    isPartOf: safeCategory
      ? {
          "@type": "MusicPlaylist",
          name: safeCategory.title,
          url: `https://www.shalomworship.com/category/${safeCategory.slug}`,
        }
      : undefined,

    inAlbum: safeAlbum
      ? {
          "@type": "MusicAlbum",
          name: safeAlbum.title,
          url: `https://www.shalomworship.com/album/${safeAlbum.slug}-${safeAlbum.id}`,
          image: {
            "@type": "ImageObject",
            url: safeAlbum.image || "",
          },
        }
      : undefined,

    datePublished: songData.createdAt?.toISOString?.() || undefined,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.shalomworship.com/song/${songData.slug}-${songData.id}`,
    },

    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Songs",
          item: "https://www.shalomworship.com/song",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: songData.title,
          item: `https://www.shalomworship.com/song/${songData.slug}-${songData.id}`,
        },
      ],
    },

    keywords: songData.keyword?.join(", ") || undefined,

    publisher: {
      "@type": "Organization",
      name: "Shalom Worship",
      url: "https://www.shalomworship.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.shalomworship.com/logo.png",
      },
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} />
  );
}
