import { getAllSongs } from "@/lib/static/song.static";
import { CONTENT_VISIBILITY } from "@/lib/contentVisibility";
import fs from "fs";
import path from "path";

export async function buildSongSearchIndex() {
  const songs = await getAllSongs([...CONTENT_VISIBILITY.discoverable]);

  const index = songs.map((song) => {
    const creator = song?.artist?.find(
      (item: any) => item.isCreator === true
    )?.artist;

    return {
      id: song.id,
      slug: `${song.slug}-${song.id}`,
      title: song.title,
      image: song.image,
      status: song.status,
      language: song.language,
      artist: creator?.title ?? "", // only creator name
      artistSlug: creator?.slug ?? "",
    };
  });

  const outputPath = path.join(process.cwd(), "public/search/songs.json");

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));
}
