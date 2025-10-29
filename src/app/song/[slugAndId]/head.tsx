// import slugify from "slugify";

// export default async function Head({ params }: { params: { slugAndId: string } }) {
//   // 1️⃣ Extract id from slugAndId
//   const parts = params.slugAndId.split("-");
//   const id = parts[parts.length - 1];

//   // 2️⃣ Fetch your song data from DB or API
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/song/${id}`);
//   const song = await res.json();

//   console.log(song, "song in song head")

//   // 3️⃣ Build your structured data (JSON-LD)
//   const schema = {
//     "@context": "https://schema.org",
//     "@type": "MusicComposition",
//     name: song.title, 
//     inLanguage: song.language || "en",
//     genre: song.genre || "Worship Song",
//     // lyricist: { "@type": "Person", name: song.artistName || "Unknown" },
//     // composer: { "@type": "Person", name: song.creatorName || "Unknown" },
//     publisher: {
//       "@type": "Organization",
//       name: song.creatorName || "Unknown" ,
//       url: song.artist.link || "Unknown" 
//     },
//     // description: `${song.title} lyrics with chords${song.isTranslation ? ", translation" : ""}${song.hasNashville ? ", Nashville number chart" : ""}. A worship song by ${song.artistName || "Shalom Worship"}.`,
//     text: {
//       "@type": "CreativeWork",
//       lyricText: song.lines?.[0]?.lyrics?.[song.language] || "",
//       musicArrangement: {
//         "@type": "MusicArrangement",
//         musicKey: song.key || "N/A",
//         hasChords: song.isChords || false,
//         nashvilleNumbers: song.nashvilleNumbers || ""
//       }
//     },
//     mainEntityOfPage: {
//       "@type": "WebPage",
//       "@id": `https://shalomworship.com/song/${song.slug}-${song.id}`
//     }
//   };

//   // 4️⃣ Return meta and structured data
//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(schema)
//         }}
//       />
//     </>
//   );
// }
