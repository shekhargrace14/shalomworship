import { buildSongSearchIndex } from "@/lib/search/buildSongIndex";


async function main() {
  await buildSongSearchIndex();
}

main();