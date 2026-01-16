// src/utils/seo.ts

import type { Metadata } from "next";
import { getLanguageName } from "./getLanguageName";

export function buildSongMetadata({
    song,
    slugAndId,
}: {
    song: any;
    slugAndId: string;
}): Metadata {
    if (!song) {
        return {
            title: "Song Not Found - Shalom Worship",
            description: "The song you are looking for does not exist.",
        };
    }

    const lang = song.language || "en";
    const langName = getLanguageName(lang);
    const artists = song.artist?.map((a: any) => a.artist.title) || [];
    const primaryArtist = artists[0] || "Unknown Artist";

    const canonicalUrl = `https://www.shalomworship.com/song/${song.slug}-${song.id}`;

    const category = song.category.map((c: any) => c.category.title)

    // Title
    const title = 
        `${song.title} Lyrics ${song.searchVariant[0] ? `- ${song.searchVariant[0]}` : ""}
        ${song.isChords ? " Chords & Nashville Number Chart" : ""}  | ${primaryArtist} | Shalom Worship`;

    // Description
    const description =
    `${song.title} is a Christian worship song by ${primaryArtist}, commonly sung in moments of 
    ${category}. This page provides the lyrics${song.isChords ? ", chords & Nashville Number System" : ""}, prepared for congregational worship and personal devotion.${song?.searchVariant ?` This song is widely known by the refrain "${song?.searchVariant}".` : ""}
    `;

    // OG Image fallback
    const image = song.image || `https://img.youtube.com/vi/${song.videoId}/maxresdefault.jpg`;

    // Keywords
    const keywords = [
        `${song.title} lyrics`,
        ` ${song.title} ${langName} lyrics`,
        ` ${song.title} chords and nashville number`,
        ` ${primaryArtist} songs`,
        ` Christian worship song`,
        ` Shalom Worship lyrics`
    ];
    const authors = song?.primaryArtist

    const publishedTime = song?.createdAt?.toISOString?.() || "";
    const modifiedTime = song?.updatedAt?.toISOString?.() || publishedTime;

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: canonicalUrl,
        },
        authors,
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            type: "music.song",
            siteName: "Shalom Worship",
            images: [{ url: image, width: 1200, height: 630 }],
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },


        other: {
            // For JSON-LD auto-injection by the component
            "structured-data": "ready",
            "article:published_time": publishedTime,
            "article:modified_time": modifiedTime,
        },

    };
}
