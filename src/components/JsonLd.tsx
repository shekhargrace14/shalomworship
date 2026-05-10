// components/JsonLdScript.tsx
import { CONTENT_VISIBILITY } from "@/lib/contentVisibility";
// import { fetchSongById } from "@/lib/query/query";
import { getSong } from "@/lib/static";
import { getYouTubeMetadata } from "@/lib/youtube";
import { getLanguageName } from "@/utils/getLanguageName";

export default async function JsonLd({ id }: { id: string }) {
  // const songData = await fetchSongById(id);
  const songData = await getSong(id,[...CONTENT_VISIBILITY.discoverable])
  if (!songData) return null;

  // -------- SAFE VALUES --------
  const alternateNames = songData.searchVariant.map(s => s)
  const artist = songData.artist
  const artistNames = artist?.map(a => a.artist.title) || [];
  const primaryArtistUrl = artist[0]?.artist.link || [];
  const primaryArtist = artistNames[0] || "Unknown Artist";
  // console.log(artist[0].artist.link, "json ld isssssss")

  const lang = songData.language ?? "en";
  const langName = getLanguageName(lang);
  const key = songData.key;
  const category = songData.category.map(c => c.category.title)

  const safeImage = songData.image || "https://www.shalomworship.com/default-song.jpg";
  const safeVideoId = songData.videoId || "";
  const safeCategory = songData.category?.[0]?.category;
  const safeAlbum = songData.album?.[0]?.album;
  const aboutData = [
    {
      "@type": "Thing",
      "name": `${langName} Christian Worship Lyrics`,
      "description": `Full lyrics and resources for ${langName} worship songs.`
    },
    {
      "@type": "Thing",
      "name": "Christian Song Chords",
    }
  ]
  const youtubeData = await getYouTubeMetadata(songData.videoId)

  // console.log(youtubeData, "youtubeData")


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

    // name: `${songData.title} lyrics ${songData.isChords ? "chords and nashville number" : ""} ` ,
    name: songData.title,
    alternateName: alternateNames,
    inLanguage: lang,
    ...(key && { "musicalKey": key }),
    genre: "Gospel",
    iswcCode: "",

    // description: `${songData.title} ${langName} Christian worship song by ${primaryArtist}. Read lyrics${songData.isChords ? ", chords and Nashville Numbers Chart" : ""}, translation, and meaning.`,
    description: [
      `${songData.title} is a Christian worship song by ${primaryArtist}, commonly sung in moments of ${category}.`,
      `This page provides the lyrics${songData.isChords ? ", chords & Nashville Number System" : ""}, prepared for congregational worship and personal devotion.`, songData?.searchVariant[0]
        ? `This this song is widely known by the refrain "${songData.searchVariant[0]}".`
        : null
    ].filter(Boolean).join(" "),


    lyrics: {
      "@type": "CreativeWork",
      text: lyricSnippet ? `${lyricSnippet}...` : undefined,
    },

    lyricist: { "@type": "Person", name: primaryArtist },
    composer: { "@type": "Person", name: primaryArtist },

    creator: artistNames.map(name => ({
      "@type": "Person",
      name
    })),
    "subjectOf": {
      "@type": "VideoObject",
      "name": `${songData.title} Official Video`,
      "description": `Official worship video for ${songData.title} by ${primaryArtist}`,
      "thumbnailUrl": safeImage,
      "uploadDate": youtubeData?.uploadDate,
      "duration": youtubeData?.duration,
      "contentUrl": `https://www.youtube.com/watch?v=${songData.videoId}`,
      "embedUrl": `https://www.youtube.com/embed/${songData.videoId}`,
      "interactionCount": youtubeData?.viewCount
    },


    about: [
      {

        "@type": "Thing",
        "name": `${langName} Christian Worship Lyrics`, // Adding 'Lyrics' is key
        "sameAs": "https://en.wikipedia.org/wiki/Contemporary_Christian_music" // High-authority link
      },
      {
        "@type": "Thing",
        "name": "Worship Chords and Tabs", // Targets the 23k impression 'chord' intent
      },
      {
        "@type": "Thing",
        "name": `${langName} Gospel Songs`,
      },
      ...aboutData
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

    // keywords: songData.keyword?.join(", ") || undefined,

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
